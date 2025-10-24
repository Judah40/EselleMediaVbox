/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl.clone();
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const token = request.cookies.get("token")?.value;
    const userType = request.cookies.get("userType")?.value;

    // Fetch authentication status
    const apiResponse = await fetch(`${apiurl}/auth/authenticate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const isAuthenticated = apiResponse.ok;
    const [_, section, pages, path] = pathname.split("/");

    // console.log(path);
    // Define redirection logic
    if (!isAuthenticated) {
      if (pages === "Auth") return NextResponse.next();
      if (pages === "Live" && path?.length === 3) return NextResponse.next();
      if (pages === "Live" && path?.length === 4) {
        return NextResponse.redirect(
          new URL("/pages/Auth/Signin", request.url)
        );
      }
      return NextResponse.redirect(new URL("/pages/Home", request.url));
    }

    // Authenticated users
    if (isAuthenticated) {
      if (
        (pages === "Dashboard" && userType === "Admin") ||
        (pages === "Live" && path?.length === 4) ||
        pages === "Settings" ||
        path === "PasswordSetup"
      ) {
        return NextResponse.next();
      }
    }

    // Default redirection for unauthorized access
    return NextResponse.redirect(new URL("/pages/Home", request.url));
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/pages/Home", request.url));
  }
}

export const config = {
  matcher: [
    "/pages/Dashboard/:path*",
    "/pages/Auth/:path*",
    // '/pages/Live/:path*',
    "/pages/Settings/:path*",
  ],
};
