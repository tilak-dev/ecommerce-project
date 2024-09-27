import { passwordCompare, passwordHasher } from "@/helper/passwordHasher";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const reqBody = await request.json();
    const { oldPassword, newPassword } = reqBody;

    //validation
    if (!oldPassword || !userId || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password, User ID  and new password are required",
        },
        { status: 400 }
      );
    }
    // check user
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    // campare password
    const valid = await passwordCompare(oldPassword, user.password);
    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 }
      );
    }

    // new password hashed
    const hashedPassword = await passwordHasher(newPassword);

    // update password
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
      data: user,
    });
  } catch (error) {
    console.log("error in updating password", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in updating password",
        error,
      },
      { status: 500 }
    );
  }
}
