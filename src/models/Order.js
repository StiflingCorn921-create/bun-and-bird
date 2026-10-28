export class Order {
  constructor({
    id,
    items = [],
    customer = {},
    orderType = 'pickup',
    branch = null,
    total = 0,
    status = 'Preparing',
    paymentMethod = 'Cash on Delivery',
    deliveryArea = null,
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.items = items;
    this.customer = customer;
    this.orderType = orderType;
    this.branch = branch;
    this.total = Number(total);
    this.status = status;
    this.paymentMethod = paymentMethod;
    this.deliveryArea = deliveryArea;
    this.createdAt = createdAt;
  }
}
