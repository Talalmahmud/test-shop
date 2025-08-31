import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes
const protectedRoutes = ["/user"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // ✅ Check only protected routes
  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ✅ For all other routes → continue
  return NextResponse.next();
}

// ✅ Apply middleware only to /user and its children
export const config = {
  matcher: ["/user", "/user/:path*"],
};
