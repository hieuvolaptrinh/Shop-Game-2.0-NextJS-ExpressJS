import { NextRequest, NextResponse } from "next/server";
import { createCookieString, getMaxAgeForCookie } from "@/lib/cookie.helper";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: NextRequest) {
  try {
    // Lấy refreshToken từ cookies
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token not found" },
        { status: 401 }
      );
    }

    // Gọi API backend với refreshToken
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const data = await response.json();

    // Lấy cookies từ backend response
    const setCookieHeader = response.headers.get("set-cookie");

    // Tạo response
    const nextResponse = NextResponse.json(data, { status: response.status });

    // Parse và set lại cookies với sameSite: strict
    if (setCookieHeader) {
      const cookies = setCookieHeader.split(",").map((c) => c.trim());

      cookies.forEach((cookieString) => {
        // Extract cookie name và value
        const [nameValue] = cookieString.split(";");
        const [name, value] = nameValue.split("=");

        if (name && value) {
          // Set cookie với sameSite: strict cho mobile
          const cookieStr = createCookieString(name, value, {
            maxAge: getMaxAgeForCookie(name),
          });

          nextResponse.headers.append("Set-Cookie", cookieStr);
        }
      });
    }

    return nextResponse;
  } catch (error: any) {
    console.error("Refresh token API error:", error);
    return NextResponse.json(
      { message: error.message || "Token refresh failed" },
      { status: 500 }
    );
  }
}
