const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TechnologyCategorySchema = new mongoose.Schema(
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
    name_es: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

TechnologyCategorySchema.virtual("technologies", {
  ref: "Technology",
  localField: "_id",
  foreignField: "technologyCategory",
});

TechnologyCategorySchema.index({ name: "text" });

TechnologyCategorySchema.plugin(mongoosePaginate);

export default mongoose.models.TechnologyCategory ||
  mongoose.model("TechnologyCategory", TechnologyCategorySchema);
