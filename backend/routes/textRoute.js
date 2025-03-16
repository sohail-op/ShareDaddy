import express from "express";

import {upload} from "../middleware/multerStorageHandler.js";
import {
  uploadText, uploadFile, getFile, getText
} from "../controllers/textController.js";

const router = express.Router();

router.route("/uploadText").post(uploadText);
router.route("/uploadFile").post( upload.single("file"), uploadFile);
router.route("/getText/:code").get(getText);
router.route("/getFile/:code").get(getFile);

export default router;
