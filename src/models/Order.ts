import mongoose, { Document, Schema } from "mongoose";

export interface Order extends Document {
  customer: string;
  order: string;
  customerAddress: string;
  deliveryDate: string;
  totalPrice: string;
  deliveryStatus: string;
  payment: string;
}

export const orderSchema: Schema<Order> = new Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
      required: true,
      default: new Date().toISOString(),
    },
    totalPrice: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },
    payment: {
      type: String,
      required: true,
      enum: ["cash on delivery", "online payment"],
    },
  },
  { timestamps: true }
);

const orderModel =
  (mongoose.models.orders as mongoose.Model<Order>) ||
  mongoose.model<Order>("orders", orderSchema);

export default orderModel;
