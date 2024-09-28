import dbConnect from "@/configs/dbconnect";
import orderModel from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function GET(request: NextRequest) {
  try {
    const response = await orderModel.find({});
    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "No Order List found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Order List",
        data: response,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error in fetching Orders ",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
