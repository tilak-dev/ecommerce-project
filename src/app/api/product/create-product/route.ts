import dbConnect from "@/configs/dbconnect";
import { passwordHasher } from "@/helper/passwordHasher";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  dbConnect(); //necessary for bd connect
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    if (!username || !password || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required fields",
        },
        { status: 400 }
      );
    }
    //Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }
    //hashing the password
    const hashedPassword = await passwordHasher(password);
    //Create new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      {
        success: true,
        message: "User signed up successfully",
        response: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error in signup page", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in signing up",
      },
      { status: 500 }
    );
  }
}
