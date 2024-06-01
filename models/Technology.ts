const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TechnologySchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      trim: true,
      default: 0,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
    imageWhite: {
      type: String,
      trim: true,
    },
    imageWhiteFilepath: {
      type: String,
      trim: true,
    },
    imageLightBlue: {
      type: String,
      trim: true,
    },
    imageLightBlueFilepath: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

TechnologySchema.index({ name: "text" });

TechnologySchema.plugin(mongoosePaginate);

export default mongoose.models.Technology ||
  mongoose.model("Technology", TechnologySchema);
