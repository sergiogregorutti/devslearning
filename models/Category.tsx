import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    photo: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
