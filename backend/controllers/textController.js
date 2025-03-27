import cryptoRandomString from "crypto-random-string";
import expressAsyncHandler from "express-async-handler";

import File from "../model/fileModel.js";
import { io } from "../socket/socket.js";
import {redis} from "../config/redis.js";


//@des Upload text
//@route POST /api/uploadText
// @access Public
export const uploadText = expressAsyncHandler(async (req, res) => {
  const text = req.body.text;
  const genCode = cryptoRandomString({ length: 4, type: "numeric" });

  if (!text.trim()) {
    res.status(400);
    throw new Error("No Text Provided");
  }

    await File.create({ text, code: genCode }); //store in MongoDB
    await redis.set(genCode, text, "EX", 600); //store in Redis
    res.status(201).json({ genCode });
  
  io.to(genCode).emit("newText", text);
});

//@des Upload File
//@route POST /api/uploadFile
// @access Public
export const uploadFile = expressAsyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded!");
  }
  
  const genCode = cryptoRandomString({ length: 5, type: "numeric" });
  
  const fileDetails = {
    fileData: req.file.buffer.toString("base64"),
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
  };
  await File.create({
    code: genCode,
    fileData: fileDetails.fileData,
    fileName: fileDetails.fileName,
    fileType: fileDetails.fileType,
  });
  
  await redis.set(genCode, JSON.stringify(fileDetails), "EX", 600);
  
  io.emit("file:uploaded", {genCode, fileName: req.file.originalname});
  
  res.status(201).json({ genCode, fileName: req.file.originalname });
});
 
//@des Get uploaded file or text
//@route GET /api/getData/:code
//@access Public
export const getData = expressAsyncHandler(async (req, res) => {
  const { code } = req.params;

  if (!code) {
    res.status(400);
    throw new Error("No Code provided");
  }

  const cachedData = await redis.get(code);
  if (cachedData) {
    try {
      const parsedData = JSON.parse(cachedData);
      
      if (parsedData.fileData && parsedData.fileName && parsedData.fileType) {
        const fileBuffer = Buffer.from(parsedData.fileData, "base64");
        res.header("Content-Type", parsedData.fileType);
        res.header("Content-Disposition", `attachment; filename=${parsedData.fileName}`);
        return res.status(200).send(fileBuffer);
      }
      return res.status(200).json({ text: cachedData });
    } catch (error) {
      return res.status(200).json({ text: cachedData });
    }
  }

  const textData = await File.findOne({ code });

  if (!textData) {
    res.status(404);
    throw new Error("Data not found or expired!");
  }

  await redis.set(code, textData.text, "EX", 600);
  res.status(200).json({ text: textData.text });
});