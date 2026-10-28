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
}
