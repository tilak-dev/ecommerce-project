import dbConnect from "@/configs/dbconnect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect(); // Ensure the DB connection is established

  try {
    const reqBody = await request.json();
    const { checked, radio } = reqBody;

    if (!checked && !radio) {
      throw new Error("No filters provided");
    }

    const query: any = {};

    if (checked && Array.isArray(checked)) {
      query.category = { $in: checked };
    }

    if (radio) {
      const [minPrice, maxPrice] = radio;
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    const products = await Product.find(query);
    return NextResponse.json(
      { success: true, count: products.length, data: products },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error filtering products", error.message);
    return NextResponse.json(
      { message: "Error in filtering data", error: error.message },
      { status: 500 }
    );
  }
}
