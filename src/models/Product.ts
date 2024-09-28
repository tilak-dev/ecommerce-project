import mongoose, { Schema, Document, Types } from "mongoose";


export interface ProductType extends Document {
  name: string;
  price: number;
  slug: string;
  description: string;
  category: Types.ObjectId;
  quantity: number;
  photoLink: string;
  shipping: boolean;
}

const productSchema: Schema<ProductType> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photoLink: {
      type: String,
      required: true,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Product =
  (mongoose.models.products as mongoose.Model<ProductType>) ||
  mongoose.model<ProductType>("products", productSchema);
