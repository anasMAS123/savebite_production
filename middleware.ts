import { NextResponse, NextRequest } from "next/server";
import { updateCurrentUser } from "./helpers/helpers";

export async function middleware(request: NextRequest) {
  const res = await updateCurrentUser();
  //get pathname//
  const pathname = request.nextUrl.pathname;

  //if there any authenticated user ?
  const isAuthUser = request.cookies.get("session");
  //if otp session is opened
  const openOtpFlag = request.cookies.get("intermediate-session");

  //protectedRoutes
  const protectedRoutes = [
    "/dashboard",
    "/analytics",
    "/chatbite",
    "/stock",
    "/tracking",
    "/community",
  ];

  //auth routes
  const authRoutes = ["/signup", "/login"];

  // is auth Route ?
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // is protected Route ?
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  //the user is trying to get /login but not /login/with-img for exmaple it must return false
  // the same for signup
  const loginWaySelected =
    pathname.startsWith("/login") && pathname !== "/login";

  const signupWaySelected =
    pathname.startsWith("/signup") && pathname !== "/signup";

  //if authenticated user tried to go to authentication route like signup
  if (isAuthUser && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  //if not authenticated user tried to go to protected route like dashboard
  if (!isAuthUser && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login/with-img", request.url));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // if the login way is not specified go to /login/with-img
  if (pathname.startsWith("/login")) {
    if (!isAuthUser && isAuthRoute && !loginWaySelected) {
      return NextResponse.redirect(new URL("/login/with-img", request.url));
    } else if (!isAuthUser && isAuthRoute && loginWaySelected) {
      return res;
    } else if (isAuthUser && isProtectedRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // if the signup way is not specified go to /login/with-img
  if (pathname.startsWith("/signup")) {
    if (pathname.startsWith("/signup/verify") && !openOtpFlag) {
      return NextResponse.redirect(new URL("/signup/signup", request.url));
    } else if (!isAuthUser && isAuthRoute && !signupWaySelected) {
      return NextResponse.redirect(new URL("/signup/signup", request.url));
    } else if (!isAuthUser && isAuthRoute && signupWaySelected) {
      return res;
    } else if (isAuthUser && isProtectedRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: "/:path*",
};
