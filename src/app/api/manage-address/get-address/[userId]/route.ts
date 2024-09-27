import dbConnect from "@/configs/dbconnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

dbConnect()
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
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
