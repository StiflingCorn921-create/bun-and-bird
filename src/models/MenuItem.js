import { siteContent } from '../data/siteContent';

export class MenuItem {
  constructor({ id, name, description, price, categoryId, image, tags = [], addOns = [] }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = Number(price);
    this.categoryId = categoryId;
    this.image = image;
    this.tags = tags;
    this.addOns = addOns;
  }

  getFormattedPrice() {
    const symbol = siteContent?.common?.currencySymbol || '₱';
    return `${symbol}${this.price.toFixed(2)}`;
  }

  matches(query) {
    if (!query || !query.trim()) return true;
    const q = query.trim().toLowerCase();
    const nameMatch = Boolean(this.name && this.name.toLowerCase().includes(q));
    const descMatch = Boolean(this.description && this.description.toLowerCase().includes(q));
    const tagMatch = Array.isArray(this.tags) && this.tags.some(tag => tag.toLowerCase().includes(q));
    return nameMatch || descMatch || tagMatch;
  }
}

