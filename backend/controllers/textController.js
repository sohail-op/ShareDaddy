import cryptoRandomString from "crypto-random-string";
import expressAsyncHandler from "express-async-handler";

import File from "../model/fileModel.js";

//@des Upload text
//@route POST /api/uploadText
// @access Public
export const uploadText = expressAsyncHandler(async (req, res) => {
  const text = req.body.text;
  const genCode = await cryptoRandomString({ length: 4, type: "numeric" });

  if (!text) {
    res.status(400);
    throw new Error("No Text Provided");
  } else {
    await File.create({ text, code: genCode });
    res.status(201).json({ genCode });
  }
});

//@des Get uploaded texts
//@route GET /api/getText/:code
// @access Public
export const getText = expressAsyncHandler(async (req, res) => {
  const { code } = req.params;

  if (!code) {
    res.status(400);
    throw new Error("No Code provided");
  } else {
    const file = await File.findOne({ code });
    if (!file) {
      res.status(404);
      throw new Error("Could not find the requested file!");
    } else {
      res.json({ Text: file.text });
    }
  }
});

//@des Delete uploaded text
//@route DELETE /api/deleteExpiredText
// @access Public
export const deleteExpiredText = (req, res) => {
  res.send("Deleted Expired Texts");
};
