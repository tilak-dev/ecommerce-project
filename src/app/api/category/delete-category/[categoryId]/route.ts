import dbConnect from "@/configs/dbconnect";
import CategoryModel from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  await dbConnect(); //necessary for bd connect
  try {
    const { categoryId } = params;
    if (!categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide Category Id",
        },
        { status: 400 }
      );
    }
    const deletedcategory = await CategoryModel.findByIdAndDelete(categoryId);
    if (!deletedcategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found or already deleted",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Category Deleted successfully",
        data: deletedcategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in delete Category", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in delete Category",
        error,
      },
      { status: 500 }
    );
  }
}
