import { Combo } from '../models/Combo';
import { menuItemsMap } from './menuItems';
import { comboAddOns } from './addOns';

export const combos = [
  // TODO: [IMAGE 09] Save your photo as public/images/burger-combo.jpg
  new Combo({
    id: 'combo-burger',
    name: 'Burger Combo',
    description: 'Two mains, two sides, two drinks',
    price: 360,
    categoryId: 'combos',
    image: '/images/burger-combo.jpg',
    tags: ['best seller'],
    addOns: comboAddOns,
    includedItems: [
      menuItemsMap.get('burger-classic'),
      menuItemsMap.get('side-potato-wedges'),
      menuItemsMap.get('burger-double-stack'),
    ].filter(Boolean),
    discount: 50,
  }),

  // TODO: [IMAGE 10] Save your photo as public/images/chicken-combo.jpg
  new Combo({
    id: 'combo-chicken',
    name: 'Chicken Combo',
    description: 'Eight pieces, four sides, four drinks',
    price: 360,
    categoryId: 'combos',
    image: '/images/chicken-combo.jpg',
    tags: ['best seller'],
    addOns: comboAddOns,
    includedItems: [
      menuItemsMap.get('chicken-2pc'),
      menuItemsMap.get('chicken-spicy-wings'),
      menuItemsMap.get('side-potato-wedges'),
    ].filter(Boolean),
    discount: 50,
  }),
];

export const combosMap = new Map(combos.map((c) => [c.id, c]));

// All 10 menu items combined (8 individual items + 2 combos)
export const allMenuItems = [...menuItemsMap.values(), ...combos];
export const allMenuItemsMap = new Map(allMenuItems.map((item) => [item.id, item]));
