export class Order {
  constructor({
    id,
    items = [],
    customer = {},
    orderType = 'pickup',
    branch = null,
    total = 0,
    status = 'Preparing',
  }) {
    this.id = id;
    this.items = items;
    this.customer = customer;
    this.orderType = orderType;
    this.branch = branch;
    this.total = Number(total);
    this.status = status;
  }

  advanceStatus() {
    if (this.status === 'Preparing') {
      this.status = 'Ready';
    } else if (this.status === 'Ready') {
      this.status = 'Completed';
    }
  }
}

