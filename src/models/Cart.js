export const DELIVERY_FEE = 49;

export class Cart {
  constructor(items = [], promo = null, orderType = 'pickup') {
    this.items = items;
    this.promo = promo;
    this.orderType = orderType;
  }

  getSubtotal() {
    return (this.items || []).reduce(
      (sum, item) => sum + (typeof item.getSubtotal === 'function' ? item.getSubtotal() : 0),
      0
    );
  }

  getDiscount() {
    if (!this.promo) return 0;
    const subtotal = this.getSubtotal();
    if (this.promo.type === 'percent') {
      return (subtotal * this.promo.value) / 100;
    }
    if (this.promo.type === 'fixed') {
      return Math.min(subtotal, this.promo.value);
    }
    return 0;
  }

  getDeliveryFee() {
    if (this.orderType !== 'delivery') return 0;
    if (this.promo?.type === 'freeDelivery') return 0;
    return DELIVERY_FEE;
  }

  getFee() {
    return this.getDeliveryFee();
  }

  getTotal() {
    const total = this.getSubtotal() - this.getDiscount() + this.getDeliveryFee();
    return Math.max(0, total);
  }
}
