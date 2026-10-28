import { Order } from '../models/Order';

const ORDERS_STORAGE_KEY = 'bun_bird_orders';

export const SERVICED_DELIVERY_AREAS = [
  { id: 'taguig', name: 'Taguig / Bonifacio Global City (BGC)', region: 'Metro Manila', branchId: 'branch-bgc' },
  { id: 'makati', name: 'Makati City', region: 'Metro Manila', branchId: 'branch-bgc' },
  { id: 'pasig', name: 'Pasig / Ortigas', region: 'Metro Manila', branchId: 'branch-bgc' },
  { id: 'qc', name: 'Quezon City (Tomas Morato / Diliman / New Manila)', region: 'Metro Manila', branchId: 'branch-qc' },
  { id: 'mandaluyong', name: 'Mandaluyong / San Juan', region: 'Metro Manila', branchId: 'branch-bgc' },
  { id: 'cebu-city', name: 'Cebu City (Ayala / Lahug / Mabolo / Downtown)', region: 'Metro Cebu', branchId: 'branch-cebu' },
  { id: 'cebu-srp', name: 'Cebu SRP / SM Seaside / Mambaling / Talisay', region: 'Metro Cebu', branchId: 'branch-sm-seaside' },
  { id: 'mandaue', name: 'Mandaue City', region: 'Metro Cebu', branchId: 'branch-cebu' },
];

export const orderService = {
  getServicedAreas() {
    return SERVICED_DELIVERY_AREAS;
  },

  isAreaCovered(areaId) {
    if (!areaId) return false;
    return SERVICED_DELIVERY_AREAS.some((area) => area.id === areaId);
  },

  createOrder({ items, customer, orderType, branch, total, paymentMethod = 'Cash on Delivery', deliveryArea = null }) {
    const orderId = `BNB-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = new Order({
      id: orderId,
      items: [...items],
      customer,
      orderType,
      branch,
      total,
      status: 'Preparing',
      paymentMethod,
      deliveryArea,
      createdAt: new Date().toISOString(),
    });

    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      existing.unshift(newOrder);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existing.slice(0, 20)));
    } catch (e) {
      console.warn('Failed to save order history:', e);
    }

    return newOrder;
  },

  advanceStatus(currentStatus) {
    if (currentStatus === 'Preparing') return 'Ready';
    if (currentStatus === 'Ready') return 'Completed';
    return currentStatus;
  },
};
