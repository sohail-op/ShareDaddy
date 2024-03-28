import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    text: { type: String, required: [true, "Please  provide text content"] },

    code: { type: String, required: [true, "Code is missing"], unique: true },
  },
  {
    timestamps: true, // Saves createdAt and updatedAt as dates. Creates them in ISO 8601 format yyyy-mm-ddTHH:MM:SS.ssstimestamps: true});
  }
);

const File = mongoose.model("File", fileSchema);

export default File;
