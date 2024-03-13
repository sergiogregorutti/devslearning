import mongoose from "mongoose";

export interface Categories extends mongoose.Document {
  name: string;
  photo: string;
}

const CategorySchema = new mongoose.Schema<Categories>({
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
});

export default mongoose.models.Category ||
  mongoose.model<Categories>("Category", CategorySchema);
