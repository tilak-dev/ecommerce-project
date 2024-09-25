import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface CloudinaryResponse {
  public_id: string;
  url: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("productImage") as File;
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file provided",
        },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const result: CloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "products",
            use_filename: true,
            format: "jpg",
            quality: 90,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryResponse);
          }
        )
        .end(buffer);
    });
    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        image: result.url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error uploading image: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error uploading image",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
