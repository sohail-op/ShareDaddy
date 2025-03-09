import express from "express";
import multer from "multer";

import {
  uploadText, uploadFile, getTextOrFile
} from "../controllers/textController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.route("/uploadText").post(uploadText);
router.route("/uploadFile").post( upload.single("file"), uploadFile);
router.route("/getTextOrFile/:code").get(getTextOrFile);

export default router;
