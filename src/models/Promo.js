export class Promo {
  constructor({ code, type, value }) {
    this.code = code;
    this.type = type; // "percent" | "fixed" | "freeDelivery"
    this.value = Number(value);
  }

  calculateDiscount(subtotal) {
    if (this.type === 'percent') {
      return (subtotal * this.value) / 100;
    }
    if (this.type === 'fixed') {
      return Math.min(subtotal, this.value);
    }
    // "freeDelivery" promo provides 0 discount to food subtotal; fee is handled by Cart.getFee()
    return 0;
  }
}

