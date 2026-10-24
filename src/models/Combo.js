import { MenuItem } from './MenuItem';

export class Combo extends MenuItem {
  constructor({
    id,
    name,
    description,
    price,
    categoryId = 'combos',
    image,
    tags = [],
    addOns = [],
    includedItems = [],
    discount = 0,
  }) {
    super({ id, name, description, price, categoryId, image, tags, addOns });
    this.includedItems = includedItems;
    this.discount = Number(discount);
  }

  getTotalValue() {
    return this.includedItems.reduce((total, item) => total + (Number(item?.price) || 0), 0);
  }

  getSavings() {
    if (this.discount > 0) {
      return this.discount;
    }
    const savings = this.getTotalValue() - this.price;
    return savings > 0 ? savings : 0;
  }
}

