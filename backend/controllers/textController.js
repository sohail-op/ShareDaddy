import cryptoRandomString from "crypto-random-string";
import expressAsyncHandler from "express-async-handler";
import Redis from "ioredis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { io } from "../socket/socket.js";
import File from "../model/fileModel.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const redis = new Redis({
  host: process.env.REDIS_SERVICE_NAME,
  port: process.env.REDIS_PORT || 6379,
});

redis.connect(()=>{ console.log("Connected to Redis") });


//@des Upload File
//@route POST /api/uploadFile
// @access Public
export const uploadFile = expressAsyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded!");
  }

  const genCode = cryptoRandomString({ length: 4, type: "numeric" });

   await File.create({
    code: genCode,
    fileUrl: `/uploads/${req.file.filename}`,
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
  });

  res.status(201).json({ genCode, fileName: req.file.originalname });

  // res.status(200).json({ message: "File uploaded successfully" });
});

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
    await redis.setex(genCode, 600, text); //store in Redis
    res.status(201).json({ genCode });
  
  io.to(genCode).emit("newText", text);
});

//@des Get uploaded text/file
//@route GET /api/getTextOrFile/:code
//@access Public
export const getTextOrFile = expressAsyncHandler(async (req, res) => {
  const { code } = req.params;

  if (!code) {
    res.status(400);
    throw new Error("No Code provided");
  } 

  // const cachedFile = await redis.get(code);
  // if (cachedFile.fileUrl) {
  //   return res.json({ fileUrl: cachedFile.fileUrl, fileName: cachedFile.fileName });
  // }
  // else if(cachedFile.body){
  //   return res.json({ text: cachedFile.body });
  // }

    const fileData = await File.findOne({ code });
    if (!fileData) {
      res.status(404);
      throw new Error("Could not find the requested file!");
    }

    // await redis.setex(code, 600, fileData.text);
    
    if (fileData.text) {
      return res.status(200).json({ text: fileData.text });
    }
  
    // Serve file as an attachment
    const filePath = path.join(__dirname, "..", "uploads", fileData.fileName);
  
    if (!fs.existsSync(filePath)) {
      res.status(404);
      throw new Error("File not found on server!");
    }
  
    // res.download(filePath, fileData.fileName, (err) => {
    //   if (err) {
    //     console.error("Error sending file:", err);
    //     res.status(500).json({ error: "File download failed" });
    //   }
    // });
    res.status(200).json({ fileName: fileData.fileName, filePath: filePath });
});