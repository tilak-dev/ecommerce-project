import mongoose, { Document, Schema } from "mongoose";

export interface CategoryType extends Document {
  categoryName: string;
  slug: string;
}

const categorySchema: Schema<CategoryType> = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryModel =
  (mongoose.models.category as mongoose.Model<CategoryType>) ||
  mongoose.model<CategoryType>("category", categorySchema);

export default CategoryModel;
