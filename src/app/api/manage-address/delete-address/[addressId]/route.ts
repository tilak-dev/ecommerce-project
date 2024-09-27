import dbConnect from "@/configs/dbconnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function DELETE(
  request: NextRequest,
  { params }: { params: { addressId: string } }
) {
  try {
    const reqBody = await request.json();
    const { userId } = reqBody;
    const { addressId } = params;
    if (!userId || !addressId) {
      return NextResponse.json(
        {
          success: false,
          message: "adress and user is not found",
        },
        { status: 404 }
      );
    }
    // check user
    const result = await UserModel.updateOne({_id :userId}, {
      $pull: { address: { _id: addressId } },
    });

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "address not fount or already deleted",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log("error in deleting address field", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in deleteing address field",
        error,
      },
      { status: 500 }
    );
  }
}
