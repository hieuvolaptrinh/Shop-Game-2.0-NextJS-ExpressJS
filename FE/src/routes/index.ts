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
   * Format: /{type}-{game-name-id} (1 level nesting)
   * Ví dụ: /vip-wuthering-waves-4
   */
  accountType: (gameName: string, gameId: number | string, type: string) =>
    `/${createSlug(type)}-${createSlugWithId(gameName, gameId)}`,

  /**
   * Trang chi tiết account
   * Format: /{type}-{game-name-id}/{account-title-id.html}
   * Ví dụ: /vip-wuthering-waves-4/premium-account-123.html
   */
  accountDetail: (
    gameName: string,
    gameId: number | string,
    type: string,
    accountTitle: string,
    accountId: number | string
  ) =>
    `/${createSlug(type)}-${createSlugWithId(gameName, gameId)}/${createSlugHtml(
      accountTitle,
      accountId
    )}`,

  /**
   * Trang thanh toán
   * Format: /{type}-{game-name-id}/{account-title-id.html}/payment
   */
  accountPayment: (
    gameName: string,
    gameId: number | string,
    type: string,
    accountTitle: string,
    accountId: number | string
  ) =>
    `/${createSlug(type)}-${createSlugWithId(
      gameName,
      gameId
    )}/${createSlugHtml(accountTitle, accountId)}/payment`,

  /**
   * Alias cho accountType (backward compatibility)
   */
  accountList: (gameName: string, gameId: number | string, type: string) =>
    `/${createSlug(type)}-${createSlugWithId(gameName, gameId)}`,
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
