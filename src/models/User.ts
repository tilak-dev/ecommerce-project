import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  image?: string;
  isAdmin?: boolean;
  address: string[];
  phone?: string;
  orders?: string[];
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
    address: [],
    phone: {
      type: String,
      default: null,
    },
    orders: [],
  },
  {
    timestamps: true,
  }
);

const UserModel =
  (mongoose.models.users as mongoose.Model<User>) ||
  mongoose.model<User>("users", userSchema);

export default UserModel;
