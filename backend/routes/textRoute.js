import express from "express";

import {upload} from "../middleware/multerStorageHandler.js";
import {
  uploadText, uploadFile, getData
} from "../controllers/textController.js";

const router = express.Router();

router.route("/uploadText").post(uploadText);
router.route("/uploadFile").post( upload.single("file"), uploadFile);
router.route("/getData/:code").get(getData);

export default router;
