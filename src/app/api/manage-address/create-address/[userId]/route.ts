import dbConnect from "@/configs/dbconnect";
import UserModel, { Address } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  await dbConnect();
  try {
    const { userId } = params;
    const reqBody = await request.json();
    const { city, state, zip, country } = reqBody;

    //validation
    if (!city || !userId || !state || !zip || !country) {
      return NextResponse.json(
        {
          success: false,
          message: "all address field  are required",
        },
        { status: 400 }
      );
    }
    // check user
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    // update user address
    const newAddress = {
      city,
      state,
      zip,
      country,
    };

    user.address.push(newAddress as Address);
    //save the address
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Address added successfully",
      data: user,
    });
  } catch (error) {
    console.log("error in updating address field", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in updating address field",
        error,
      },
      { status: 500 }
    );
  }
}
