import { Promo } from '../models/Promo';

export const promos = [
  new Promo({ code: 'BUNBIRD10', type: 'percent', value: 10 }),
  new Promo({ code: 'SAVE50', type: 'fixed', value: 50 }),
  new Promo({ code: 'FREESHIP', type: 'freeDelivery', value: 0 }),
];
