import { Combo } from '../models/Combo';
import { menuItemsMap } from './menuItems';
import { comboAddOns } from './addOns';

export const combos = [
  new Combo({
    id: 'combo-burger',
    name: 'Burger Combo',
    description: 'Two mains, two sides, two drinks',
    price: 360,
    categoryId: 'combos',
    image: '🍔',
    tags: ['best seller'],
    addOns: comboAddOns,
    includedItems: [
      menuItemsMap.get('burger-classic'),
      menuItemsMap.get('side-fries'),
      menuItemsMap.get('drink-iced-tea'),
    ],
    discount: 44,
  }),
  new Combo({
    id: 'combo-chicken',
    name: 'Chicken Combo',
    description: 'Eight pieces, four sides, four drinks',
    price: 360,
    categoryId: 'combos',
    image: '🍗',
    tags: ['best seller'],
    addOns: comboAddOns,
    includedItems: [
      menuItemsMap.get('chicken-2pc'),
      menuItemsMap.get('side-mashed-potato'),
      menuItemsMap.get('drink-cola-float'),
    ],
    discount: 50,
  }),
  new Combo({
    id: 'combo-family',
    name: 'Family Bucket',
    description: 'Any burger, fries, and a drink',
    price: 360,
    categoryId: 'combos',
    image: '🎉',
    tags: ['best seller'],
    addOns: comboAddOns,
    includedItems: [
      menuItemsMap.get('chicken-2pc'),
      menuItemsMap.get('chicken-spicy-wings'),
      menuItemsMap.get('burger-double-stack'),
      menuItemsMap.get('chicken-sandwich'),
      menuItemsMap.get('side-fries'),
      menuItemsMap.get('side-mashed-potato'),
    ],
    discount: 151,
  }),
  new Combo({
    id: 'combo-duo',
    name: 'Bird & Bun Duo Feast',
    description: 'The best of both worlds: Double Stack, Six-Piece Wings, seasoned fries, and house lemonade.',
    price: 469,
    categoryId: 'combos',
    image: '🍱',
    tags: ['best seller', 'new'],
    addOns: comboAddOns,
    includedItems: [
      menuItemsMap.get('burger-double-stack'),
      menuItemsMap.get('chicken-spicy-wings'),
      menuItemsMap.get('side-fries'),
      menuItemsMap.get('drink-lemonade'),
    ],
    discount: 88,
  }),
  new Combo({
    id: 'combo-snack',
    name: 'Crunch & Sweet Box',
    description: 'Crispy chicken tenders with dip, beer-battered onion rings, and a warm cinnamon apple pie.',
    price: 279,
    categoryId: 'combos',
    image: '🎁',
    tags: ['new'],
    addOns: comboAddOns,
    includedItems: [
      menuItemsMap.get('chicken-tenders'),
      menuItemsMap.get('side-onion-rings'),
      menuItemsMap.get('dessert-apple-pie'),
    ],
    discount: 54,
  }),
];

// All menu items combined (individual items first so the top 8 match Figma, followed by combos)
export const allMenuItems = [...menuItemsMap.values(), ...combos];
export const allMenuItemsMap = new Map(allMenuItems.map(item => [item.id, item]));
