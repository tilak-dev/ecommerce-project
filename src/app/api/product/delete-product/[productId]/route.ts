import dbConnect from "@/configs/dbconnect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 }
      );
    }
    const response = await Product.findByIdAndDelete(productId);
    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "No products found",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "product deleted successfully",
        response,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error in fetching product",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
