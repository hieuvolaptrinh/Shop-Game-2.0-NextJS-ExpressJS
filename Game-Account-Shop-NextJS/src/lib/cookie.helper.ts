import { parse, serialize, type SerializeOptions } from "cookie";

/**
 * Parse Set-Cookie header từ backend response
 * và extract cookie name + value
 */
export function parseSetCookieHeader(setCookieHeader: string): Array<{
  name: string;
  value: string;
  options: Record<string, any>;
}> {
  const result: Array<{
    name: string;
    value: string;
    options: Record<string, any>;
  }> = [];

  // Split multiple cookies (separated by comma outside of Expires date)
  const cookieStrings = setCookieHeader.split(/,(?=[^;]+?=)/);

  cookieStrings.forEach((cookieString) => {
    const parts = cookieString.trim().split(";");
    if (parts.length === 0) return;

    // First part is name=value
    const [nameValue] = parts;
    const equalIndex = nameValue.indexOf("=");
    if (equalIndex === -1) return;

    const name = nameValue.substring(0, equalIndex).trim();
    const value = nameValue.substring(equalIndex + 1).trim();

    // Parse cookie options từ các parts còn lại
    const options: Record<string, any> = {};
    parts.slice(1).forEach((part) => {
      const [key, val] = part.trim().split("=");
      if (key) {
        const lowerKey = key.toLowerCase();
        if (lowerKey === "max-age") {
          options.maxAge = Number.parseInt(val, 10);
        } else if (lowerKey === "expires") {
          options.expires = new Date(val);
        } else if (lowerKey === "path") {
          options.path = val;
        } else if (lowerKey === "domain") {
          options.domain = val;
        } else if (lowerKey === "samesite") {
          options.sameSite = val;
        } else if (lowerKey === "httponly") {
          options.httpOnly = true;
        } else if (lowerKey === "secure") {
          options.secure = true;
        }
      }
    });

    result.push({ name, value, options });
  });

  return result;
}

/**
 * Tạo cookie string với sameSite: strict cho mobile
 */
export function createCookieString(
  name: string,
  value: string,
  options: SerializeOptions = {}
): string {
  const defaultOptions: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Quan trọng: strict cho mobile (iPhone)
    path: "/",
    ...options,
  };

  return serialize(name, value, defaultOptions);
}

/**
 * Xác định maxAge dựa trên tên cookie
 */
export function getMaxAgeForCookie(cookieName: string): number {
  if (cookieName === "accessToken") {
    return 30 * 60; // 30 phút
  }
  if (cookieName === "refreshToken") {
    return 7 * 24 * 60 * 60; // 7 ngày
  }
  return 24 * 60 * 60; // Default 1 ngày
}
