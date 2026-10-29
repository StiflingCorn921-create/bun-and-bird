import { Cart, DELIVERY_FEE } from '../models/Cart';
import { CartItem } from '../models/CartItem';
import { promos as defaultPromos } from '../data/promos';

const CART_STORAGE_KEY = 'bun_bird_cart';
export { DELIVERY_FEE };

export class CartService {
  loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return new Cart([], null, 'pickup');
      const parsed = JSON.parse(saved);
      if (!parsed || !Array.isArray(parsed.items)) return new Cart([], null, 'pickup');
      const items = parsed.items
        .filter((raw) => raw && raw.menuItem)
        .map(
          (raw) =>
            new CartItem({
              id: raw.id,
              menuItem: raw.menuItem,
              quantity: Number(raw.quantity) || 1,
              selectedAddOns: Array.isArray(raw.selectedAddOns) ? raw.selectedAddOns : [],
            })
        );
      return new Cart(items, parsed.promo || null, parsed.orderType || 'pickup');
    } catch {
      return new Cart([], null, 'pickup');
    }
  }

  saveCart(cart) {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          items: cart.items,
          promo: cart.promo,
          orderType: cart.orderType,
        })
      );
    } catch (e) {
      console.warn('Failed to save cart:', e);
    }
  }

  clearCartStorage() {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear cart:', e);
    }
  }

  addItem(cart, incomingItem) {
    const incomingAddOnsKey = (incomingItem.selectedAddOns || [])
      .map((a) => a.id)
      .sort()
      .join(',');

    const existingIndex = cart.items.findIndex((existing) => {
      if (existing.menuItem?.id !== incomingItem.menuItem?.id) return false;
      const existingAddOnsKey = (existing.selectedAddOns || [])
        .map((a) => a.id)
        .sort()
        .join(',');
      return existingAddOnsKey === incomingAddOnsKey;
    });

    let newItems;
    if (existingIndex > -1) {
      newItems = cart.items.map((existing, idx) => {
        if (idx === existingIndex) {
          return new CartItem({
            id: existing.id,
            menuItem: existing.menuItem,
            quantity: existing.quantity + incomingItem.quantity,
            selectedAddOns: existing.selectedAddOns,
          });
        }
        return existing;
      });
    } else {
      newItems = [...cart.items, incomingItem];
    }

    const nextCart = new Cart(newItems, cart.promo, cart.orderType);
    this.saveCart(nextCart);
    return nextCart;
  }

  removeItem(cart, id) {
    const newItems = cart.items.filter((item) => item.id !== id && item.menuItem?.id !== id);
    const nextCart = new Cart(newItems, cart.promo, cart.orderType);
    this.saveCart(nextCart);
    return nextCart;
  }

  updateQuantity(cart, id, quantity) {
    const nextQty = Number(quantity);
    if (nextQty <= 0) {
      return this.removeItem(cart, id);
    }
    const newItems = cart.items.map((item) => {
      if (item.id === id || item.menuItem?.id === id) {
        return new CartItem({
          id: item.id,
          menuItem: item.menuItem,
          quantity: nextQty,
          selectedAddOns: item.selectedAddOns,
        });
      }
      return item;
    });
    const nextCart = new Cart(newItems, cart.promo, cart.orderType);
    this.saveCart(nextCart);
    return nextCart;
  }

  setOrderType(cart, orderType) {
    const nextCart = new Cart(cart.items, cart.promo, orderType);
    this.saveCart(nextCart);
    return nextCart;
  }

  applyPromo(cart, code, promoList = defaultPromos) {
    if (!code || typeof code !== 'string') return { success: false, cart };
    const cleanCode = code.trim().toUpperCase();
    const match = (promoList || defaultPromos).find(
      (p) => p.code.toUpperCase() === cleanCode
    );
    if (match) {
      const nextCart = new Cart(cart.items, match, cart.orderType);
      this.saveCart(nextCart);
      return { success: true, cart: nextCart, promo: match };
    }
    return { success: false, cart };
  }

  removePromo(cart) {
    const nextCart = new Cart(cart.items, null, cart.orderType);
    this.saveCart(nextCart);
    return nextCart;
  }

  clearCart(cart) {
    this.clearCartStorage();
    return new Cart([], null, cart?.orderType || 'pickup');
  }
}

export const cartService = new CartService();
