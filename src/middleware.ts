import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;
  const publicPath = path.startsWith("/signin") || path.startsWith("/signup");

  const privatePath = path.startsWith("/dashboard");

  const adminPath = path.startsWith("/admin");

  console.log(token);
  if (token && publicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && privatePath) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  
}
export const config = {
  matcher: [
    "/signin",
    "/admin",
    "admin/:path*",
    "/signup",
    "/",
    "/dashboard/:path*",
  ],
};
