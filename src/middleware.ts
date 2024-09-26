import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;
  const publicPath = path.startsWith("/signin") || path.startsWith("/signup");

  const privatePath = path.startsWith("/dashboard");

  const adminPath =
    path.startsWith("/admin") ||
    path.startsWith("/admin/manage-category") ||
    path.startsWith("/admin/manage-product") ||
    path.startsWith("/admin/create-product");

  console.log(token);
  if (token && publicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && privatePath) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (token) {
    if (adminPath && token.isAdmin) {
      return NextResponse.next();
    }
    if (adminPath && !token.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (privatePath) {
      return NextResponse.next();
    }
  }
}
export const config = {
  matcher: [
    "/signin",
    "/admin",
    "/admin/manage-category",
    "/admin/create-product",
    "/admin/manage-product",
    "/signup",
    "/",
    "/dashboard/:path*",
  ],
};
