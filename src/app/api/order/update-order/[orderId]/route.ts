import dbConnect from "@/configs/dbconnect";
import orderModel from "@/models/Order";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function PUT(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { deliveryStatus, userId, userOrderId } = reqBody;
    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required",
        },
        { status: 400 }
      );
    }

    if (!userId || !userOrderId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID and userOrderId are required",
        },
        { status: 400 }
      );
    }
    const response = await orderModel.findByIdAndUpdate(
      orderId,
      {
        deliveryStatus,
      },
      { new: true }
    );
    console.log(response);
    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "No order found",
        },
        { status: 404 }
      );
    }

    //updating user order

    if (response) {
      const result = await UserModel.updateOne(
        { _id: userId, "orders._id": userOrderId },
        {
          $set: { "orders.$.status": deliveryStatus },
        }
      );

      if (result.modifiedCount === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "order not fount or already updated",
          },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: "order updated successfully",
          response,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "User Order not found",
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error in fetching order",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
