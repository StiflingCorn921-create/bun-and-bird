export class CartItem {
  constructor({ menuItem, quantity = 1, selectedAddOns = [], id = null }) {
    this.id = id || `${menuItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    this.menuItem = menuItem;
    this.quantity = Number(quantity);
    this.selectedAddOns = selectedAddOns;
  }

  getSubtotal() {
    const addOnsTotal = (this.selectedAddOns || []).reduce(
      (sum, addOn) => sum + (Number(addOn?.price) || 0),
      0
    );
    return (this.menuItem.price + addOnsTotal) * this.quantity;
  }
}

