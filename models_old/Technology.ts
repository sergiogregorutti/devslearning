const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
import TechnologyCategory from "./TechnologyCategory";

const { ObjectId } = mongoose.Schema;

const TechnologySchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      trim: true,
      default: 0,
    },
    technologyCategory: {
      type: ObjectId,
      ref: TechnologyCategory,
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
    imageColor: {
      type: String,
      trim: true,
    },
    imageColorFilepath: {
      type: String,
      trim: true,
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
