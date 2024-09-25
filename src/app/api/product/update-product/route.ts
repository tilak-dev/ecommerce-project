import dbConnect from "@/configs/dbconnect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

dbConnect();

export async function PUT(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const reqBody = await request.json();
    const {
      name,
      price,
      description,
      category,
      quantity,
      shipping,
      photoLink,
    } = reqBody;
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
    const response = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        slug: slugify(name),
        price,
        description,
        category,
        quantity,
        shipping,
        photoLink,
      },
      { new: true }
    );
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
        message: "product updated successfully",
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
      { status: 500 }
    );
  }
}
