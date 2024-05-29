const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { ObjectId } = mongoose.Schema;

const CourseSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      enum: ["en", "es"],
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    description: {
      type: String,
      required: true,
      max: 2000,
    },
    image: {
      type: String,
      trim: true,
    },
    imageFilepath: {
      type: String,
      trim: true,
    },
    platform: {
      type: String,
      max: 2000,
    },
    author: {
      type: String,
      max: 2000,
    },
    pricing: {
      type: String,
      enum: ["free", "one-time-payment", "subscription"],
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      max: 9999,
      default: 0,
    },
    year: {
      type: Number,
      trim: true,
    },
    technology: {
      type: ObjectId,
      ref: "Technology",
    },
    link: {
      type: String,
      trim: true,
      required: true,
      max: 2000,
    },
  },
  { timestamps: true }
);

CourseSchema.index({ name: "text" });

CourseSchema.plugin(mongoosePaginate);

const MongoModel =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
export default MongoModel;
