import dbConnect from "@/configs/dbconnect";
import UserModel from "@/models/User";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

dbConnect();
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;
  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Session not found",
      },
      { status: 404 }
    );
  }
  const userId = user?._id;
  try {
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
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

    return NextResponse.json({
      success: true,
      message: "order added successfully",
      data: user.orders,
    });
  } catch (error) {
    console.log("error in searching orders", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in order searching",
        error,
      },
      { status: 500 }
    );
  }
}
