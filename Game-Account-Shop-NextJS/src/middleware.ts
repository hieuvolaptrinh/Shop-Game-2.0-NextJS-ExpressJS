import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // 👉 Bỏ qua middleware cho admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|admin|.*\\..*).*)",
    "/",
  ],
};
