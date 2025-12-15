import { NextRequest, NextResponse } from "next/server";
import { createCookieString, getMaxAgeForCookie } from "@/lib/cookie.helper";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Gọi API backend
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
    console.error("Register API error:", error);
    return NextResponse.json(
      { message: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
