import {
  canUseCookies,
  getLocalAccessToken,
  saveTokensToLocal,
  clearLocalTokens,
  getLocalRefreshToken,
} from "@/lib/auth.client";

export const API_BASE = "https://game-account-shop-nestjs.onrender.com";

export type FetchOptions = RequestInit & { query?: Record<string, any> };

function buildQuery(q?: Record<string, any>): string {
  if (!q) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(q)) {
    if (value == null) continue;
    if (Array.isArray(value))
      value.forEach((v) => params.append(key, String(v)));
    else params.append(key, String(value));
  }
  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  // if (!res.ok) {
  //   const err = new Error(
  //     (body as any)?.message || res.statusText || "Request failed"
  //   );
  //   (err as any).status = res.status;
  //   (err as any).body = body;
  //   throw err;
  // }
  return body as T;
}

/** ✅ Helper: có nên refresh không */
function shouldRefresh(path: string, status: number): boolean {
  if (status !== 401) return false;
  if (path.startsWith("/auth/")) return false;
  return true;
}

/** ✅ Refresh token: cookie + local */
async function refreshToken(): Promise<void> {
  const localRefreshToken = getLocalRefreshToken();
  const headers: Record<string, string> = {};

  if (localRefreshToken)
    headers["Authorization"] = `Bearer ${localRefreshToken}`;

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers,
  });

  if (!res.ok) throw new Error("No valid refresh token");
  const body = await res.json();

  const token = body?.data?.tokens?.accessToken;
  if (token) {
    saveTokensToLocal({ accessToken: token });
  } else {
    throw new Error("No access token received");
  }
}

/** ✅ API chính */
export async function apiFetch<T = any>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { query, ...rest } = options;
  const url = `${API_BASE}${path}${buildQuery(query)}`;
  const cookieSupported = canUseCookies();
  const localAccessToken = getLocalAccessToken();

  const headers: Record<string, string> = {
    ...(rest.headers as Record<string, string>),
  };
  if (!(rest.body instanceof FormData))
    headers["Content-Type"] = "application/json";

  const doFetch = (useLocalToken = false) => {
    const h = { ...headers };
    if (useLocalToken && localAccessToken) {
      h["Authorization"] = `Bearer ${localAccessToken}`;
    }
    return fetch(url, {
      ...rest,
      headers: h,
      credentials: cookieSupported ? "include" : "omit",
    });
  };

  // 🟢 B1: local token
  let res = await doFetch(!!localAccessToken);

  // 🟡 B2: fallback cookie
  if (res.status === 401) {
    console.warn("Local token failed → trying cookie");
    res = await doFetch(false);
  }

  // 🔴 B3: refresh token nếu được phép
  if (shouldRefresh(path, res.status)) {
    try {
      console.warn("Attempting token refresh...");
      await refreshToken();
      res = await doFetch(true);
    } catch (err) {
      console.error("Refresh token failed:", err);
      window.dispatchEvent(new Event("unauthorized"));
      throw err;
    }
  }

  return handleResponse<T>(res);
}

/** ✅ Logout toàn cục */
export async function logout(): Promise<void> {
  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    clearLocalTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
}
