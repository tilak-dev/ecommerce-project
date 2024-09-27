import dbConnect from "@/configs/dbconnect";
import UserModel from "@/models/User";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

dbConnect()
export async function GET(
  request: NextRequest,
) {

  const session = await getServerSession(authOptions)

  const user:User = session?.user as User;
     const userId = user?._id
  try {
   if (!userId){
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
      message: "Address added successfully",
      data: user.address,
    });
  } catch (error) {
    console.log("error in updating address field", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in updating address field",
        error,
      },
      { status: 500 }
    );
  }
}
