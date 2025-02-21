import cryptoRandomString from "crypto-random-string";
import expressAsyncHandler from "express-async-handler";
import Redis from "ioredis";

import { io } from "../socket/socket.js";
import File from "../model/fileModel.js";

const redis = new Redis(process.env.REDIS_URL, {
  // tls: {},
  // connectTimeout: 10000,
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

//@des Get uploaded texts
//@route GET /api/getText/:code
// @access Public
export const getText = expressAsyncHandler(async (req, res) => {
  const { code } = req.params;

  if (!code) {
    res.status(400);
    throw new Error("No Code provided");
  } 

  const cachedText = await redis.get(code);
  if (cachedText) {
    return res.json({ Text: cachedText });
  }

    const file = await File.findOne({ code });
    if (!file) {
      res.status(404);
      throw new Error("Could not find the requested file!");
    }

    await redis.setex(code, 600, file.text);
  
    res.json({ Text: file.text });

});