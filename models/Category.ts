const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

categorySchema.index({ name: "text" });

categorySchema.plugin(mongoosePaginate);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
