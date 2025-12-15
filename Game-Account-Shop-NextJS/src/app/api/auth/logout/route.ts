import { NextRequest, NextResponse } from "next/server";
import { createCookieString } from "@/lib/cookie.helper";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: NextRequest) {
  try {
    // Lấy cookies từ request để forward đến backend
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // Gọi API backend với cookies
    const response = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });

    const data = await response.json();

    // Tạo response và xóa cookies
    const nextResponse = NextResponse.json(data, { status: response.status });

    // Xóa accessToken cookie
    nextResponse.headers.append(
      "Set-Cookie",
      createCookieString("accessToken", "", { maxAge: 0 })
    );

    // Xóa refreshToken cookie
    nextResponse.headers.append(
      "Set-Cookie",
      createCookieString("refreshToken", "", { maxAge: 0 })
    );

    return nextResponse;
  } catch (error: any) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { message: error.message || "Logout failed" },
      { status: 500 }
    );
  }
}
