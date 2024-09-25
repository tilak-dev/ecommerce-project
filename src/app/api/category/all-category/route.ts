import dbConnect from "@/configs/dbconnect";
import CategoryModel from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect(); //necessary for bd connect
  try {
    //getting the category from the database
    const category = await CategoryModel.find({});

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: " error in Category",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Category found successfully",
        count: category.length,
        data: category,
      },
      { status: 200 }
    );
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
