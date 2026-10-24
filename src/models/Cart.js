import { CartItem } from './CartItem';
import { promos as defaultPromos } from '../data/promos';

export const DELIVERY_FEE = 49;

export class Cart {
  constructor(items = [], promo = null, orderType = 'pickup') {
    this.items = items;
    this.promo = promo;
    this.orderType = orderType;
  }

  clone() {
    return new Cart([...this.items], this.promo, this.orderType);
  }

  addItem(item) {
    const incomingAddOnsKey = (item.selectedAddOns || [])
      .map(a => a.id)
      .sort()
      .join(',');

    const existingIndex = this.items.findIndex(existing => {
      if (existing.menuItem.id !== item.menuItem.id) return false;
      const existingAddOnsKey = (existing.selectedAddOns || [])
        .map(a => a.id)
        .sort()
        .join(',');
      return existingAddOnsKey === incomingAddOnsKey;
    });

    let newItems;
    if (existingIndex > -1) {
      newItems = this.items.map((existing, idx) => {
        if (idx === existingIndex) {
          return new CartItem({
            id: existing.id,
            menuItem: existing.menuItem,
            quantity: existing.quantity + item.quantity,
            selectedAddOns: existing.selectedAddOns,
          });
        }
        return existing;
      });
    } else {
      newItems = [...this.items, item];
    }

    this.items = newItems;
    return new Cart(newItems, this.promo, this.orderType);
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id && item.menuItem?.id !== id);
    return new Cart(this.items, this.promo, this.orderType);
  }

  updateQuantity(id, qty) {
    const nextQty = Number(qty);
    if (nextQty <= 0) {
      return this.removeItem(id);
    }
    this.items = this.items.map(item => {
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
    return new Cart(this.items, this.promo, this.orderType);
  }

  setOrderType(orderType) {
    this.orderType = orderType;
    return new Cart(this.items, this.promo, this.orderType);
  }

  applyPromo(code, promoCatalog = defaultPromos) {
    if (!code || typeof code !== 'string') return false;
    const cleanCode = code.trim().toUpperCase();
    const catalog = Array.isArray(promoCatalog) ? promoCatalog : (defaultPromos || []);
    const match = catalog.find(p => p.code.toUpperCase() === cleanCode);
    if (match) {
      this.promo = match;
      return true;
    }
    return false;
  }

  removePromo() {
    this.promo = null;
    return new Cart(this.items, null, this.orderType);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  getDiscount() {
    if (!this.promo) return 0;
    return this.promo.calculateDiscount(this.getSubtotal());
  }

  getFee() {
    if (this.orderType !== 'delivery') return 0;
    if (this.promo && this.promo.type === 'freeDelivery') return 0;
    return DELIVERY_FEE;
  }

  getTotal() {
    const total = this.getSubtotal() - this.getDiscount() + this.getFee();
    return Math.max(0, total);
  }

  clear() {
    this.items = [];
    this.promo = null;
    return new Cart([], null, this.orderType);
  }
}

