import dbConnect from "@/configs/dbconnect";
import UserModel, { userOrder } from "@/models/User";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Product } from "@/models/Product";

export async function POST(request: NextRequest) {
  await dbConnect();

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
    const { address, totalPrice, productId } = reqBody;

    //validation
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    if (!address || !totalPrice || !productId) {
      return NextResponse.json(
        {
          success: false,
          message: "all address field  are required",
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

    // update user address
    const newOrder = {
      address,
      totalPrice,
      productId,
      status: "pending",
    };

    user.orders.push(newOrder as userOrder);
    //save the address
    await user.save();
    return NextResponse.json({
      success: true,
      message: "order added successfully",
      data: user.orders,
    });
  } catch (error) {
    console.log("error in adding Order", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in adding Order",
        error,
      },
      { status: 500 }
    );
  }
}
