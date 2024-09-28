import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/configs/dbconnect";
import { Product } from "@/models/Product";
import UserModel from "@/models/User";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function DELETE(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
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
  const userId = user._id;
  try {
    const reqBody = await request.json();
    const { productId } = reqBody;
    const { orderId } = params;
    if (!userId || !orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "adress and user is not found",
        },
        { status: 404 }
      );
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { $inc: { quantity: +1 } },
      { new: true }
    );
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }
    // check user
    if (product) {
      const result = await UserModel.updateOne(
        { _id: userId },
        {
          $pull: { orders: { _id: orderId } },
        }
      );

      if (result.modifiedCount === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "order not fount or already deleted",
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "order deleted successfully",
        data: result,
      });
    }

    return NextResponse.json({
      success: false,
      message: "error in deleting order",
    });
  } catch (error) {
    console.log("error in deleting order field", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in deleteing order field",
        error,
      },
      { status: 500 }
    );
  }
}
