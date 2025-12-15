// import { NextRequest, NextResponse } from "next/server";
// import { createCookieString, getMaxAgeForCookie } from "@/lib/cookie.helper";

// const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     /** ================== GỌI BACKEND ================== */
//     const backendRes = await fetch(`${BACKEND_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//       credentials: "include",
//     });

//     const result = await backendRes.json();

//     /** ================== XỬ LÝ RESPONSE ================== */
//     const nextRes = NextResponse.json(result, { status: backendRes.status });

//     /** ================== NHÚNG COOKIE AN TOÀN ================== */
//     const setCookieHeaders = backendRes.headers.getSetCookie?.() || [];

//     // ✅ fallback cho Node <18.3 (nếu getSetCookie chưa có)
//     const cookieStrings =
//       setCookieHeaders.length > 0
//         ? setCookieHeaders
//         : parseSetCookieFallback(backendRes.headers.get("set-cookie"));

//     for (const cookieStr of cookieStrings) {
//       const parsed = parseCookiePair(cookieStr);
//       if (!parsed) continue;

//       const { name, value } = parsed;

//       const cookieString = createCookieString(name, value, {
//         maxAge: getMaxAgeForCookie(name),
//         path: "/",
//         secure: true,
//         sameSite: "strict",
//         httpOnly: true,
//       });

//       nextRes.headers.set("Set-Cookie", cookieString);
//     }

//     return nextRes;
//   } catch (error: any) {
//     console.error("❌ Login API proxy error:", error);

//     return NextResponse.json(
//       {
//         message: "Login failed",
//         error: error?.message || "Unexpected error",
//       },
//       { status: 500 }
//     );
//   }
// }

// /* ===========================================================
//    ✅ Helper: parse multiple Set-Cookie safely (fallback)
// =========================================================== */
// function parseSetCookieFallback(header: string | null): string[] {
//   if (!header) return [];
//   // split by comma but keep quoted strings (important for Expires)
//   const cookies: string[] = [];
//   let current = "";
//   let insideQuotes = false;

//   for (const char of header) {
//     if (char === ",") {
//       if (!insideQuotes) {
//         cookies.push(current.trim());
//         current = "";
//         continue;
//       }
//     }
//     if (char === '"') insideQuotes = !insideQuotes;
//     current += char;
//   }
//   if (current.trim()) cookies.push(current.trim());
//   return cookies;
// }

// /* ===========================================================
//    ✅ Helper: extract name=value safely
// =========================================================== */
// function parseCookiePair(
//   cookieString: string
// ): { name: string; value: string } | null {
//   try {
//     const [nameValue] = cookieString.split(";");
//     const [name, ...rest] = nameValue.split("=");
//     const value = rest.join("=").trim();
//     if (!name || !value) return null;
//     return { name: name.trim(), value };
//   } catch {
//     return null;
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { createCookieString, getMaxAgeForCookie } from "@/lib/cookie.helper";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    /** ================== GỌI BACKEND ================== */
    const backendRes = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await backendRes.json();

    /** ================== CHUẨN BỊ RESPONSE ================== */
    const nextRes = NextResponse.json(data, { status: backendRes.status });

    /** ================== XỬ LÝ COOKIE ================== */
    // Dùng .getSetCookie() nếu Node >=18.3
    const rawCookies =
      backendRes.headers.getSetCookie?.() ||
      parseSetCookieFallback(backendRes.headers.get("set-cookie"));

    // Chỉ set lại 2 loại cookie hợp lệ
    const cookieWhitelist = ["accessToken", "refreshToken"];

    for (const cookieStr of rawCookies) {
      const parsed = parseCookiePair(cookieStr);
      if (!parsed) continue;

      const { name, value } = parsed;
      if (!cookieWhitelist.includes(name)) continue;

      const cookieStrSafe = createCookieString(name, value, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: getMaxAgeForCookie(name),
      });

      // ✅ Dùng append thay vì set (để giữ cả 2 token)
      nextRes.headers.append("Set-Cookie", cookieStrSafe);
    }

    return nextRes;
  } catch (error: any) {
    console.error("❌ Login API proxy error:", error);
    return NextResponse.json(
      { message: "Login failed", error: error?.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

/* ===========================================================
   ✅ Helper: parse multiple Set-Cookie safely (fallback)
=========================================================== */
function parseSetCookieFallback(header: string | null): string[] {
  if (!header) return [];
  const cookies: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (const char of header) {
    if (char === ",") {
      if (!insideQuotes) {
        cookies.push(current.trim());
        current = "";
        continue;
      }
    }
    if (char === '"') insideQuotes = !insideQuotes;
    current += char;
  }

  if (current.trim()) cookies.push(current.trim());
  return cookies;
}

/* ===========================================================
   ✅ Helper: extract name=value safely
=========================================================== */
function parseCookiePair(
  cookieString: string
): { name: string; value: string } | null {
  try {
    const [nameValue] = cookieString.split(";");
    const [name, ...rest] = nameValue.split("=");
    const value = rest.join("=").trim();
    if (!name || !value) return null;
    return { name: name.trim(), value };
  } catch {
    return null;
  }
}
