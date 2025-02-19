import express from "express";

import {
  uploadText,
  getText,
  deleteExpiredText,
} from "../controllers/textController.js";

const router = express.Router();

router.route("/uploadText").post(uploadText);
router.route("/getText/:code").get(getText);
router.route("/deleteExpiredText").delete(deleteExpiredText); // delete auto text after 15 mins

export default router;
