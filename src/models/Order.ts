import mongoose, { Document, Schema } from "mongoose";

export interface Order extends Document {
  customer: string;
  order: string;
  deliveryDate: string;
  totalPrice: string;
  status: string;
  payment: string;
}

export const orderSchema: Schema<Order> = new Schema({
  customer: {
    type: String,
    required: true,
  },
  order: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
});

const orderModel =
  (mongoose.models.orders as mongoose.Model<Order>) ||
  mongoose.model<Order>("orders", orderSchema);

export default orderModel;
