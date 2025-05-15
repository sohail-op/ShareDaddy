import cryptoRandomString from "crypto-random-string";
import expressAsyncHandler from "express-async-handler";
import dotenv from 'dotenv';

dotenv.config();

import File from "../model/fileModel.js";
import { io } from "../socket/socket.js";
import {redis} from "../config/redis.js";
import { uploadToR2 } from "../config/r2config.js";


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
  
  // io.to(genCode).emit("newText", text);
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
  
  const result = await uploadToR2(req.file);
  
  const fileDetails = {
    fileData: result.Location,
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
  
  res.status(201).json({ genCode });
  // io.emit("file:uploaded", {genCode, fileName: req.file.originalname});
  // res.json({ url: result.Location });
});
 
//@des Get uploaded file or text
//@route GET /api/getData/:code
//@access Public
export const getData = expressAsyncHandler(async (req, res) => {
  const { code } = req.params;

  if (!code) {
    res.status(400);
    throw new Error("No code provided");
  }

  const cachedData = await redis.get(code);
  if (cachedData) {
    try {
      const parsed = JSON.parse(cachedData);
      if (parsed.fileData && parsed.fileName && parsed.fileType) {
        const { fileData, fileName, fileType } = parsed;

        res.setHeader("Content-Type", fileType);
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

        return res.redirect(`${process.env.PUBLIC_R2_URL}/${fileName}`);
      }
    } catch (err) {
      return res.status(200).json({ text: cachedData });
    }
  }

  const rawData = await File.findOne({ code });
  if (!rawData) {
    res.status(404);
    throw new Error("Data not found or expired!");
  }

  if (rawData.fileData && rawData.fileName && rawData.fileType) {
    const { fileData, fileName, fileType } = rawData;

    res.setHeader("Content-Type", fileType);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    await redis.set(code, JSON.stringify({ fileData, fileName, fileType }), "EX", 600);

    return res.redirect(`${process.env.PUBLIC_R2_URL}/${fileName}`);
  }

  await redis.set(code, rawData.text, "EX", 600);
  return res.status(200).json({ text: rawData.text });
});
