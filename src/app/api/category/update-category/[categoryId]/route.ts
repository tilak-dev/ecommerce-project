import dbConnect from "@/configs/dbconnect";
import CategoryModel from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function PUT(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  await dbConnect(); //necessary for bd connect
  try {
    const { categoryId } = params;
    const reqBody = await request.json();
    const { categoryName } = reqBody;
    if (!categoryName || !categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide the category name and its Id",
        },
        { status: 400 }
      );
    }
    //Check if user already exists
    const updatedcategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        categoryName,
        slug: slugify(categoryName),
      },
      { new: true }
    );
    if (!updatedcategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Category Updated successfully",
        data: updatedcategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in updatede Category", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in update Category",
        error,
      },
      { status: 500 }
    );
  }
}
