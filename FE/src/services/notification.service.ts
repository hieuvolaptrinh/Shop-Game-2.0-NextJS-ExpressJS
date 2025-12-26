import { api } from '@/lib/fetch';
import { API_ROUTES } from '@/constants/routes';
import type { Notification, NotificationFilterParams, PaginatedResponse } from '@/types/index.type';

/**
 * Notification Service
 */
class NotificationService {
  /**
   * Get notifications with filters
   */
  async getNotifications(
    params?: NotificationFilterParams
  ): Promise<PaginatedResponse<Notification>> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.userId) searchParams.set('userId', params.userId);
    if (params?.isRead !== undefined) searchParams.set('isRead', params.isRead.toString());

    const query = searchParams.toString();
    const endpoint = query
      ? `${API_ROUTES.NOTIFICATIONS.LIST}?${query}`
      : API_ROUTES.NOTIFICATIONS.LIST;

    return api.get<PaginatedResponse<Notification>>(endpoint, {
      tags: ['notifications'],
    });
  }

  /**
   * Get notification by ID
   */
  async getNotificationById(id: string): Promise<Notification> {
    return api.get<Notification>(API_ROUTES.NOTIFICATIONS.DETAIL(id), {
      tags: ['notifications', `notification-${id}`],
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(id: string): Promise<Notification> {
    return api.patch<Notification>(API_ROUTES.NOTIFICATIONS.MARK_READ(id));
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    return api.patch(API_ROUTES.NOTIFICATIONS.MARK_ALL_READ);
  }

  /**
   * Get unread count
   */
  async getUnreadCount(): Promise<number> {
    const response = await this.getNotifications({ isRead: false, limit: 1 });
    return response.meta.total;
  }
}

export const notificationService = new NotificationService();
