import { api } from '@/lib/fetch';
import { API_ROUTES } from '@/constants/routes';
import type { Account, AccountFilterParams, PaginatedResponse } from '@/types/index.type';

/**
 * Account Service
 */
class AccountService {
  /**
   * Get accounts with pagination and filters
   * Uses Next.js cache with revalidate
   */
  async getAccounts(params?: AccountFilterParams): Promise<PaginatedResponse<Account>> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.typeId) searchParams.set('typeId', params.typeId);
    if (params?.minPrice) searchParams.set('minPrice', params.minPrice.toString());
    if (params?.maxPrice) searchParams.set('maxPrice', params.maxPrice.toString());
    if (params?.status) searchParams.set('status', params.status);
    if (params?.rank) searchParams.set('rank', params.rank);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    const query = searchParams.toString();
    const endpoint = query ? `${API_ROUTES.ACCOUNTS.LIST}?${query}` : API_ROUTES.ACCOUNTS.LIST;

    return api.get<PaginatedResponse<Account>>(endpoint, {
      revalidate: 60, // Cache for 60 seconds
      tags: ['accounts'], // Tag for revalidation
      requireAuth: false,
    });
  }

  /**
   * Get account by ID
   */
  async getAccountById(id: string): Promise<Account> {
    return api.get<Account>(API_ROUTES.ACCOUNTS.DETAIL(id), {
      revalidate: 30,
      tags: ['accounts', `account-${id}`],
      requireAuth: false,
    });
  }

  /**
   * Create account
   */
  async createAccount(data: Partial<Account>): Promise<Account> {
    return api.post<Account>(API_ROUTES.ACCOUNTS.CREATE, data);
  }

  /**
   * Update account
   */
  async updateAccount(id: string, data: Partial<Account>): Promise<Account> {
    return api.put<Account>(API_ROUTES.ACCOUNTS.UPDATE(id), data);
  }

  /**
   * Delete account
   */
  async deleteAccount(id: string): Promise<void> {
    return api.delete(API_ROUTES.ACCOUNTS.DELETE(id));
  }

  /**
   * Purchase account
   */
  async purchaseAccount(accountId: string, paymentMethod: string): Promise<any> {
    return api.post(API_ROUTES.ACCOUNTS.PURCHASE(accountId), { paymentMethod });
  }
}

export const accountService = new AccountService();
