import { Combo } from '../models/Combo';
import { menuItemsMap } from './menuItems';
import { comboAddOns } from './addOns';

export const combos = [
  new Combo({
    id: 'combo-burger',
    name: 'Classic Burger Combo',
    description: 'Our award-winning Classic Cheeseburger paired with hot crinkle-cut fries and fresh calamansi iced tea.',
    price: 199,
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
    name: 'Crispy Chicken Combo',
    description: 'Two pieces of golden fried chicken with buttery mashed potato, pepper gravy, and a chilled cola float.',
    price: 249,
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
    id: 'combo-duo',
    name: 'Bird & Bun Duo Feast',
    description: 'The best of both worlds: Double Stack Smash Burger, 6-pc Hot & Spicy Wings, seasoned fries, and house lemonade.',
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
    id: 'combo-family',
    name: 'Ultimate Family Bucket',
    description: 'Feast for 3-4 hungry foodies: 2-pc Fried Chicken, 6-pc Wings, Double Stack Burger, Chicken Sandwich, Fries & Mashed Potato.',
    price: 749,
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

// All menu items combined (individual items + combos)
export const allMenuItems = [...combos, ...menuItemsMap.values()];
export const allMenuItemsMap = new Map(allMenuItems.map(item => [item.id, item]));
