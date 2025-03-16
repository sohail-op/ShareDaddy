import cryptoRandomString from "crypto-random-string";
import expressAsyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { io } from "../socket/socket.js";
import File from "../model/fileModel.js";
import {redis} from "../config/redis.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

//@des Get uploaded text
//@route GET /api/getText/:code
//@access Public
export const getText = expressAsyncHandler(async (req, res) => {
	const {	code } = req.params;

	if (!code) {
		res.status(400);
		throw new Error("No Code provided");
	}

	const cachedText = await redis.get(code);
	if (cachedText) {
		return res.status(200).json({ text: cachedText });
	}

  const textData = await File.findOne({ code})
  if (!textData) {
    res.status(404);
    throw new Error("Could not find the requested file!");
  } 
	await redis.set(code, textData.text, "EX",600);
  res.status(200).json({ text: textData.text });
})

//@des Upload File
//@route POST /api/uploadFile
// @access Public
export const uploadFile = expressAsyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded!");
  }

  const genCode = cryptoRandomString({ length: 4, type: "numeric" });

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
  // res.json({"file":req.file.buffer})
});

//@des Get uploaded file
//@route GET /api/getFile/:code
//@access Public
export const getFile = expressAsyncHandler(async (req, res)=>{

  const { code } = req.params;

  if (!code) {
    res.status(400);
    throw new Error("No Code provided");
  } 

  const fileDetials = await redis.get(code);
  if(!fileDetials){
    res.status(404);
    throw new Error("File expired or not found!");
  }

  const {fileData, fileName, fileType} = JSON.parse(fileDetials);
  const fileBuffer = Buffer.from(fileData, "base64");
  
  res.header("Content-Type", fileType);
  res.header("Content-Disposition", `attachment; filename=${fileName}`);
  res.status(200).send(fileBuffer);

})



// { headers: { "Content-Type": fileData.fileType } }