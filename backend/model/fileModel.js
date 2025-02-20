import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    text: { type: String, required: [true, "Please  provide text content"] },

    code: { type: String, required: [true, "Code is missing"], unique: true },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 60 * 1000), // Set expiry time (15 mins)
      index: { expires: "30m" }, // TTL index for auto-deletion
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

export default File;
