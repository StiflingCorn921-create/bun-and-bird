export class Promo {
  constructor({ code, type, value, description = '' }) {
    this.code = code;
    this.type = type; // 'percent' | 'fixed' | 'freeDelivery'
    this.value = Number(value);
    this.description = description;
  }
}
