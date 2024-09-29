import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/configs/dbconnect";
import { getServerSession, User } from "next-auth";
import UserModel, { userOrder } from "@/models/User";
import { Product } from "@/models/Product";
import orderModel from "@/models/Order";

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
  const userId = user._id;
  try {
    const reqBody = await request.json();
    const { order, customerAddress, totalPrice, payment, productId } = reqBody;
    //validation
    console.log(reqBody)
    if (totalPrice < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Total price should be greater than 0",
        },
        { status: 400 }
      );
    }
    if (!order || !customerAddress || !payment || !productId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order, customerAddress and payment method are required",
        },
        { status: 400 }
      );
    }
    //updating product
    const product = await Product.findByIdAndUpdate(
      productId,
      { $inc: { quantity: -1 } },
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

    //fetching user
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

    //save order
    const newOrder = new orderModel({
      customer: user._id,
      order,
      customerAddress,
      totalPrice,
      payment,
      deliveryStatus: "pending",
    });

    // save user order
    const newUserOrder = {
      address: customerAddress,
      totalPrice,
      productId,
      status: "pending",
    };

    user.orders.push(newUserOrder as userOrder);
    //save the address
    await user.save();
    await newOrder.save()

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
        error
      },
      { status: 500 }
    );
  }
}
