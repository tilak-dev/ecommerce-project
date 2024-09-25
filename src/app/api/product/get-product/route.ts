import dbConnect from "@/configs/dbconnect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function GET(request: NextRequest) {
  try {
    const response = await Product.find({});
    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "No products found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: response,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error in fetching products",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
