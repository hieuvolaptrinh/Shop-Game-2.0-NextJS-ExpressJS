import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    // Lấy accessToken từ cookies
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token not found" },
        { status: 401 }
      );
    }

    // Gọi API backend với accessToken
    const response = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Profile API error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to get profile" },
      { status: 500 }
    );
  }
}
