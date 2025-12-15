import {
  createSlugWithId,
  createSlugHtml,
  createSlug,
} from "@/utils/format-slug.util";

export const ROUTES = {
  HOME: "/",
  POLICIES: "/policies",
  LOGIN: "/login",
  REGISTER: "/register",
  DEPOSIT: "/deposit",
  HISTORIES: "/histories",
} as const;

export const AdminRoutes = {
  DASHBOARD: "/admin",
  ACCOUNTS: "/admin/accounts",
  USERS: "/admin/users",
  USER_DETAIL: (id: string) => `/admin/users/${id}`,
  SETTINGS: "/admin/settings",
} as const;

export const GameRoutes = {
  /**
   * Trang game category
   * Format: /{game-name-id}
   * Ví dụ: /wuthering-waves-4
   */
  game: (gameName: string, gameId: number | string) =>
    `/${createSlugWithId(gameName, gameId)}`,

  /**
   * Trang danh sách account theo type
   * Format: /{game-name-id}/{type}
   * Ví dụ: /wuthering-waves-4/vip
   */
  accountType: (gameName: string, gameId: number | string, type: string) =>
    `/${createSlugWithId(gameName, gameId)}/${createSlug(type)}`,

  /**
   * Trang chi tiết account
   * Format: /{game-name-id}/{type}/{account-title-id.html}
   * Ví dụ: /wuthering-waves-4/vip/premium-account-123.html
   */
  accountDetail: (
    gameName: string,
    gameId: number | string,
    type: string,
    accountTitle: string,
    accountId: number | string
  ) =>
    `/${createSlugWithId(gameName, gameId)}/${createSlug(
      type
    )}/${createSlugHtml(accountTitle, accountId)}`,

  /**
   * Trang thanh toán
   * Format: /{game-name-id}/{type}/{account-title-id.html}/payment
   * Ví dụ: /wuthering-waves-4/vip/premium-account-123.html/payment
   */
  accountPayment: (
    gameName: string,
    gameId: number | string,
    type: string,
    accountTitle: string,
    accountId: number | string
  ) =>
    `/${createSlugWithId(gameName, gameId)}/${createSlug(
      type
    )}/${createSlugHtml(accountTitle, accountId)}/payment`,

  /**
   * Alias cho accountType (backward compatibility)
   */
  accountList: (gameName: string, gameId: number | string, type: string) =>
    `/${createSlugWithId(gameName, gameId)}/${createSlug(type)}`,
} as const;

export enum GameSlug {
  GENSHIN_IMPACT = "genshin-impact",
  HONKAI_STAR_RAIL = "honkai-star-rail",
  ZENLESS_ZONE_ZERO = "zenless-zone-zero",
  WUTHERING_WAVES = "wuthering-waves",
}

export enum AccountType {
  VIP = "vip",
  REROLL = "reroll",
  NORMAL = "normal",
}

export type Route =
  | (typeof ROUTES)[keyof typeof ROUTES]
  | ReturnType<(typeof GameRoutes)[keyof typeof GameRoutes]>;

export default {
  ...ROUTES,
  admin: AdminRoutes,
  games: GameRoutes,
  GameSlug,
  AccountType,
};
