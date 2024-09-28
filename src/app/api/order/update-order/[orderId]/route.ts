import dbConnect from "@/configs/dbconnect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

dbConnect();

export async function PUT(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const reqBody = await request.json();
    const { deliveryStatus } = reqBody;
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
    const response = await Product.findByIdAndUpdate(
      orderId,
      {
        deliveryStatus,
      },
      { new: true }
    );
    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "No order found",
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
