import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/configs/dbconnect";
import { getServerSession, User } from "next-auth";
import orderModel from "@/models/Order";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;
  //validation
  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Session not found",
      },
      { status: 404 }
    );
  }
  try {
    const reqBody = await request.json();
    const { order, customerAddress, totalPrice, payment } = reqBody;
    //validation
    if (!order || !customerAddress || !totalPrice || !payment) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order, customerAddress, totalPrice and payment method are required",
        },
        { status: 400 }
      );
    }
    // create order
    //save order
    const newOrder = new UserModel({
      customer: user._id,
      order,
      customerAddress,
      totalPrice,
      payment,
      deliveryStatus: "pending",
    });

    await newOrder.save();
    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log("Error in creating order", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in creating order",
      },
      { status: 500 }
    );
  }
  return;
}
