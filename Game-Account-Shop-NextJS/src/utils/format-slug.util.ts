import slugify from "slugify";

export function createSlug(text: string): string {
  if (!text) return "";
  return slugify(text, {
    locale: "en",
    lower: true,
  });
}

/**
 * Tạo slug với ID (format: slug-id)
 * Ví dụ: wuthering-waves-4
 */
export function createSlugWithId(text: string, id: number | string): string {
  return `${createSlug(text)}-${id}`;
}

/**
 * Tạo slug HTML (format: slug-id.html)
 * Ví dụ: account-name-123.html
 */
export function createSlugHtml(text: string, id: number | string): string {
  return `${createSlug(text)}-${id}.html`;
}

/**
 * Parse slug để lấy ID (từ format slug-id hoặc slug-id.html)
 * Ví dụ: "wuthering-waves-4" hoặc "account-name-123.html" -> "4" hoặc "123"
 */
export function parseSlugId(slug: string): string {
  if (!slug) return "";

  // Loại bỏ .html nếu có
  const cleanSlug = slug.replace(".html", "");

  // Lấy phần cuối cùng sau dấu gạch ngang
  const parts = cleanSlug.split("-");
  return parts[parts.length - 1];
}

/**
 * Parse slug với ID để lấy thông tin game name và game ID
 */
export function parseSlugWithId(slug: string): {
  gameName: string;
  gameId: string;
} {
  const gameId = parseSlugId(slug);
  const slugParts = slug.replace(".html", "").split("-");
  const gameName = slugParts
    .slice(0, -1)
    .join(" ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());

  return { gameName, gameId };
}

// Account type utilities
const ACCOUNT_TYPES = {
  vip: { slug: "vip", display: "VIP", apiValue: "VIP" },
  normal: { slug: "normal", display: "Normal", apiValue: "Normal" },
} as const;

export type AccountTypeSlug = keyof typeof ACCOUNT_TYPES;

export function normalizeAccountType(type: string) {
  const normalized = type.toLowerCase() as AccountTypeSlug;
  const accountType = ACCOUNT_TYPES[normalized];

  if (!accountType) {
    return null;
  }

  return {
    slug: accountType.slug,
    display: accountType.display,
    apiValue: accountType.apiValue,
  };
}
