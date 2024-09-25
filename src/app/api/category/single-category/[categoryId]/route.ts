import dbConnect from "@/configs/dbconnect";
import CategoryModel from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  await dbConnect(); //necessary for bd connect

  const { categoryId } = params;
  try {
    //validate the categoryId
    if (!categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "categoryId is required",
        },
        { status: 400 }
      );
    }
    //getting category
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: " error in finding Category",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category found successfully",
        data: category,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in single Category", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in single Category",
        error,
      },
      { status: 500 }
    );
  }
}
