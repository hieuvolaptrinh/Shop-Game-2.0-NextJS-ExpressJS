/**
 * Application route paths
 */
export const ROUTES = {
  HOME: '/',

  // Auth routes
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },

  // Dashboard routes
  DASHBOARD: {
    HOME: '/dashboard',
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
    ACCOUNTS: '/dashboard/accounts',
    TRANSACTIONS: '/dashboard/transactions',
  },

  // Account routes
  ACCOUNTS: {
    LIST: '/accounts',
    DETAIL: (id: string) => `/accounts/${id}`,
    TYPE: (typeId: string) => `/accounts/type/${typeId}`,
  },

  // Cart routes
  CART: '/cart',

  // Transaction routes
  TRANSACTIONS: {
    LIST: '/transactions',
    DETAIL: (id: string) => `/transactions/${id}`,
  },

  // User routes
  USER: {
    PROFILE: '/profile',
    WALLET: '/wallet',
    TOPUP: '/topup',
    NOTIFICATIONS: '/notifications',
  },
} as const;

/**
 * API route paths
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  ACCOUNTS: {
    LIST: '/accounts',
    DETAIL: (id: string) => `/accounts/${id}`,
    CREATE: '/accounts',
    UPDATE: (id: string) => `/accounts/${id}`,
    DELETE: (id: string) => `/accounts/${id}`,
    PURCHASE: (id: string) => `/accounts/${id}/purchase`,
  },

  ACCOUNT_TYPES: {
    LIST: '/account-types',
    DETAIL: (id: string) => `/account-types/${id}`,
    CREATE: '/account-types',
    UPDATE: (id: string) => `/account-types/${id}`,
    DELETE: (id: string) => `/account-types/${id}`,
  },

  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    REMOVE: (accountId: string) => `/cart/items/${accountId}`,
    CLEAR: '/cart/clear',
  },

  TRANSACTIONS: {
    LIST: '/transactions',
    DETAIL: (id: string) => `/transactions/${id}`,
    CREATE: '/transactions',
  },

  TOPUPS: {
    LIST: '/topups',
    DETAIL: (id: string) => `/topups/${id}`,
    CREATE: '/topups',
  },

  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    UPDATE_BALANCE: (id: string) => `/users/${id}/balance`,
  },

  NOTIFICATIONS: {
    LIST: '/notifications',
    DETAIL: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },

  PAYMENT_METHODS: {
    LIST: '/payment-methods',
  },
} as const;
