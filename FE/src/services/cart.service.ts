import { api } from '@/lib/fetch';
import { API_ROUTES } from '@/constants/routes';
import type { Cart, CartItem } from '@/types/index.type';

/**
 * Cart Service
 */
class CartService {
  /**
   * Get user's cart
   */
  async getCart(): Promise<Cart> {
    return api.get<Cart>(API_ROUTES.CART.GET, {
      tags: ['cart'],
    });
  }

  /**
   * Add item to cart
   */
  async addToCart(accountId: string): Promise<Cart> {
    return api.post<Cart>(API_ROUTES.CART.ADD, { accountId });
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(accountId: string): Promise<Cart> {
    return api.delete<Cart>(API_ROUTES.CART.REMOVE(accountId));
  }

  /**
   * Clear cart
   */
  async clearCart(): Promise<void> {
    return api.delete(API_ROUTES.CART.CLEAR);
  }

  /**
   * Get cart item count
   */
  async getCartCount(): Promise<number> {
    const cart = await this.getCart();
    return cart.items.length;
  }
}

export const cartService = new CartService();
