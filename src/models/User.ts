import mongoose, { Document, Schema, Types } from "mongoose";

export interface userOrder extends Document {
  date: Date;
  address: string;
  totalPrice: number;
  productId: Types.ObjectId;
  status: string;
}

const userOrderSchema: Schema<userOrder> = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },
  },
  { timestamps: true }
);

export interface Address extends Document {
  city: string;
  state: string;
  zip: string;
  country: string;
}

export const addressSchema: Schema<Address> = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  image?: string;
  isAdmin?: boolean;
  address: Address[];
  phone?: string;
  orders: userOrder[];
}

const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: [addressSchema],
    phone: {
      type: String,
      default: null,
    },
    orders: [userOrderSchema],
  },
  {
    timestamps: true,
  }
);

const UserModel =
  (mongoose.models.users as mongoose.Model<User>) ||
  mongoose.model<User>("users", userSchema);

export default UserModel;
