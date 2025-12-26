import { api } from '@/lib/fetch';
import { API_ROUTES } from '@/constants/routes';
import type { Transaction, TransactionFilterParams, PaginatedResponse } from '@/types/index.type';

/**
 * Transaction Service
 */
class TransactionService {
  /**
   * Get transactions with filters
   */
  async getTransactions(params?: TransactionFilterParams): Promise<PaginatedResponse<Transaction>> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.userId) searchParams.set('userId', params.userId);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.paymentMethod) searchParams.set('paymentMethod', params.paymentMethod);
    if (params?.startDate) searchParams.set('startDate', params.startDate);
    if (params?.endDate) searchParams.set('endDate', params.endDate);

    const query = searchParams.toString();
    const endpoint = query
      ? `${API_ROUTES.TRANSACTIONS.LIST}?${query}`
      : API_ROUTES.TRANSACTIONS.LIST;

    return api.get<PaginatedResponse<Transaction>>(endpoint, {
      tags: ['transactions'],
    });
  }

  /**
   * Get transaction by ID
   */
  async getTransactionById(id: string): Promise<Transaction> {
    return api.get<Transaction>(API_ROUTES.TRANSACTIONS.DETAIL(id), {
      tags: ['transactions', `transaction-${id}`],
    });
  }

  /**
   * Create transaction
   */
  async createTransaction(data: {
    accountId: string;
    paymentMethod: string;
  }): Promise<Transaction> {
    return api.post<Transaction>(API_ROUTES.TRANSACTIONS.CREATE, data);
  }
}

export const transactionService = new TransactionService();
