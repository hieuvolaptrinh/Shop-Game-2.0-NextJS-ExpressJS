import { api } from '@/lib/fetch';
import { API_ROUTES } from '@/constants/routes';
import type { Topup, TopupFilterParams, PaginatedResponse } from '@/types/index.type';

/**
 * Top-up Service
 */
class TopupService {
  /**
   * Get topups with pagination and filters
   */
  async getTopups(params?: TopupFilterParams): Promise<PaginatedResponse<Topup>> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.userId) searchParams.set('userId', params.userId);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.method) searchParams.set('method', params.method);
    if (params?.startDate) searchParams.set('startDate', params.startDate);
    if (params?.endDate) searchParams.set('endDate', params.endDate);

    const query = searchParams.toString();
    const endpoint = query ? `${API_ROUTES.TOPUPS.LIST}?${query}` : API_ROUTES.TOPUPS.LIST;

    return api.get<PaginatedResponse<Topup>>(endpoint, {
      tags: ['topups'],
    });
  }

  /**
   * Get topup by ID
   */
  async getTopupById(id: string): Promise<Topup> {
    return api.get<Topup>(API_ROUTES.TOPUPS.DETAIL(id), {
      tags: ['topups', `topup-${id}`],
    });
  }

  /**
   * Create topup request
   */
  async createTopup(data: { amount: number; method: string }): Promise<Topup> {
    return api.post<Topup>(API_ROUTES.TOPUPS.CREATE, data);
  }
}

export const topupService = new TopupService();
