import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  student: [
    /^\/dashboard$/,
    /^\/dashboard\/student\/profile$/,
    /^\/dashboard\/student\/booking$/,
    /^\/dashboard\/student\/payment$/,
  ],
  tutor: [
    /^\/dashboard$/,
    /^\/dashboard\/tutor\/profile$/,
    /^\/dashboard\/tutor\/booking$/,
  ],
  admin: [/^\/dashboard$/, /^\/dashboard\/admin\/user$/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get the current user
  const userInfo = await getCurrentUser();

  // Handle auth routes (login/register)
  if (authRoutes.includes(pathname)) {
    // If user is already logged in, redirect to dashboard
    if (userInfo) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Otherwise allow access to auth routes
    return NextResponse.next();
  }

  // If not logged in and trying to access protected route, redirect to login
  if (!userInfo) {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }

  // For dashboard routes, check role-based access
  if (pathname.startsWith("/dashboard")) {
    const role = userInfo.role as Role;
    const allowedRoutes = roleBasedPrivateRoutes[role] || [];

    // Check if the pathname matches any allowed route for the user's role
    if (allowedRoutes.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }

    // If accessing root dashboard, allow it (every role can see main dashboard)
    if (pathname === "/dashboard") {
      return NextResponse.next();
    }

    // If trying to access another role's dashboard route, redirect to user's dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For any other routes, just proceed
  return NextResponse.next();
};

export const config = {
  matcher: ["/login", "/register", "/dashboard", "/dashboard/:path*"],
};
