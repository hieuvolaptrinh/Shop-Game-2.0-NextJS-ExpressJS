/**
 * Base entity interface (MongoDB)
 */
export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * User roles
 */
export type UserRole = 'USER' | 'ADMIN';

/**
 * User status
 */
export type UserStatus = 'ACTIVE' | 'BANNED';

/**
 * User entity
 */
export interface User extends BaseEntity {
  username: string;
  email: string;
  balance: number;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
}

/**
 * User token entity
 */
export interface UserToken extends BaseEntity {
  userId: string;
  refreshToken: string;
  expiredAt: string;
}

/**
 * Account type entity
 */
export interface AccountType extends BaseEntity {
  name: string;
  description?: string;
  icon?: string;
}

/**
 * Account image
 */
export interface AccountImage {
  url: string;
}

/**
 * Account feature
 */
export interface AccountFeature {
  name: string;
  type: string;
}

/**
 * Account linked info
 */
export interface AccountLinkedInfo {
  emailLinked?: boolean;
  phoneLinked?: boolean;
  facebookLinked?: boolean;
}

/**
 * Account status
 */
export type AccountStatus = 'AVAILABLE' | 'SOLD' | 'LOCKED';

/**
 * Account entity
 */
export interface Account extends BaseEntity {
  typeId: string;
  type?: AccountType; // Populated
  price: number;
  rank?: string;
  generalCount?: number;
  skinCount?: number;
  images: AccountImage[];
  features: AccountFeature[];
  linkedInfo?: AccountLinkedInfo;
  description: string;
  status: AccountStatus;
}

/**
 * Cart item
 */
export interface CartItem {
  accountId: string;
  price: number;
  account?: Account; // Populated
}

/**
 * Cart entity
 */
export interface Cart extends BaseEntity {
  userId: string;
  items: CartItem[];
}

/**
 * Payment method enum
 */
export type PaymentMethod = 'BALANCE' | 'MOMO' | 'ATM' | 'CARD';

/**
 * Transaction status
 */
export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

/**
 * Transaction entity
 */
export interface Transaction extends BaseEntity {
  userId: string;
  user?: User; // Populated
  accountId: string;
  account?: Account; // Populated
  amount: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
}

/**
 * Top-up method
 */
export type TopupMethod = 'MOMO' | 'ATM' | 'CARD';

/**
 * Top-up status
 */
export type TopupStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

/**
 * Top-up entity
 */
export interface Topup extends BaseEntity {
  userId: string;
  user?: User; // Populated
  amount: number;
  method: TopupMethod;
  status: TopupStatus;
  providerResponse?: any;
}

/**
 * Payment method entity
 */
export interface PaymentMethodEntity extends BaseEntity {
  name: string;
  isActive: boolean;
  logo?: string;
}

/**
 * Notification entity
 */
export interface Notification extends BaseEntity {
  userId: string;
  title: string;
  content: string;
  isRead: boolean;
}

/**
 * Audit log entity
 */
export interface AuditLog extends BaseEntity {
  userId: string;
  user?: User; // Populated
  action: string;
  ip: string;
}

/**
 * Auth response
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Filter params
 */
export interface FilterParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Account filter params
 */
export interface AccountFilterParams extends FilterParams {
  typeId?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: AccountStatus;
  rank?: string;
}

/**
 * Transaction filter params
 */
export interface TransactionFilterParams extends FilterParams {
  userId?: string;
  status?: TransactionStatus;
  paymentMethod?: PaymentMethod;
  startDate?: string;
  endDate?: string;
}

/**
 * Topup filter params
 */
export interface TopupFilterParams extends FilterParams {
  userId?: string;
  status?: TopupStatus;
  method?: TopupMethod;
  startDate?: string;
  endDate?: string;
}

/**
 * Notification filter params
 */
export interface NotificationFilterParams extends FilterParams {
  userId?: string;
  isRead?: boolean;
}
