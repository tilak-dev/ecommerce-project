import dbConnect from "@/configs/dbconnect";
import CategoryModel from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(request: NextRequest) {
  await dbConnect(); //necessary for bd connect
  try {
    const reqBody = await request.json();
    const { categoryName } = reqBody;
    if (!categoryName) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide the category name",
        },
        { status: 400 }
      );
    }
    //Check if user already exists
    const category = await CategoryModel.findOne({ categoryName });

    if (category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category already exists",
        },
        { status: 400 }
      );
    }
    //Create new category
    const newCategory = new CategoryModel({
      categoryName,
      slug: slugify(categoryName),
    });
    await newCategory.save();
    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    },{status: 200});
  } catch (error) {
    console.log("error in Category", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in Category",
        error,
      },
      { status: 500 }
    );
  }
}
