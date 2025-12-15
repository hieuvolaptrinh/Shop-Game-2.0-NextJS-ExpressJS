export const TOKEN_KEYS = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
};

/** 🔹 Kiểm tra cookie cross-site */
export function canUseCookies(): boolean {
  if (typeof window === "undefined") return false;
  try {
    document.cookie = "cookie_test=1; SameSite=None; Secure";
    const supported = document.cookie.includes("cookie_test=");
    document.cookie =
      "cookie_test=1; Max-Age=0; path=/; SameSite=None; Secure;";
    return supported;
  } catch {
    return false;
  }
}

/** 🔹 Lưu token vào localStorage */
export function saveTokensToLocal(tokens: {
  accessToken: string;
  refreshToken?: string;
}) {
  if (typeof window === "undefined") return;
  if (tokens.accessToken)
    localStorage.setItem(TOKEN_KEYS.ACCESS, tokens.accessToken);
  if (tokens.refreshToken)
    localStorage.setItem(TOKEN_KEYS.REFRESH, tokens.refreshToken);
}

/** 🔹 Lấy token */
export function getLocalAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEYS.ACCESS);
}

export function getLocalRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEYS.REFRESH);
}

/** 🔹 Kiểm tra có token không */
export function hasLocalTokens(): boolean {
  return !!getLocalAccessToken() || !!getLocalRefreshToken();
}

/** 🔹 Xóa token */
export function clearLocalTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEYS.ACCESS);
  localStorage.removeItem(TOKEN_KEYS.REFRESH);
}
