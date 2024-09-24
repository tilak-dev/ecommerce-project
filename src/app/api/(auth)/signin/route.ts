import dbConnect from "@/configs/dbconnect";
import { passwordCompare } from "@/helper/passwordHasher";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  dbConnect(); //necessary for db connect
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    if (!password || !email) {
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
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 400 }
      );
    }

    //Hash password
    const isSame = await passwordCompare(user.password,password);
    //checking password
    if (!isSame) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 400 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "signin successfully",
      user: {
        _id: user._id,
        email: user.email,
        password: user.password,
        hash: isSame,
      },
    });
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
