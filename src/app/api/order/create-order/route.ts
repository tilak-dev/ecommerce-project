import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/configs/dbconnect";
import { getServerSession, User } from "next-auth";

export async function POST(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  //validation
  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Session not found",
      },
      { status: 404 }
    );
  }
  return
}
