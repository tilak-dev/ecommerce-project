import dbConnect from "@/configs/dbconnect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

//dbconnect config
dbConnect();

//create product route
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      name,
      price,
      slug,
      description,
      category,
      quantity,
      shipping,
      photoLink,
    } = reqBody;
    // validate inputs
    if (
      !name ||
      !price ||
      !slug ||
      !description ||
      !category ||
      !quantity ||
      !photoLink
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
          formdata: {
            name,
            price,
            slug,
            description,
            category,
            quantity,
            photoLink,
          },
        },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      name,
      price,
      slug,
      description,
      category,
      quantity,
      shipping: false,
      photoLink,
    });
    console.log(newProduct);
    // save product to database
    await newProduct.save();
    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: newProduct,
      },
      { status: 200 }
    );
    //...
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error in creating product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
