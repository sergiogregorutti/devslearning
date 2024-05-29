const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TechnologySchema = new mongoose.Schema(
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

const MongoModel =
  mongoose.models.Technology || mongoose.model("Technology", TechnologySchema);
export default MongoModel;
