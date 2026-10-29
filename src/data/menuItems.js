import { MenuItem } from '../models/MenuItem';
import { burgerAddOns, chickenAddOns, sidesAddOns } from './addOns';

export const menuItems = [
  new MenuItem({
    id: 'burger-classic',
    name: 'Classic Bun Burger',
    description: 'Classic Burger with a side of fries.',
    price: 170,
    categoryId: 'burgers',
    image: '/images/classicburger.jpg',
    tags: ['best seller'],
    addOns: burgerAddOns,
  }),

  new MenuItem({
    id: 'chicken-2pc',
    name: 'Crispy Bird Box',
    description: 'Signature fried chicken with a side of fries.',
    price: 220,
    categoryId: 'chicken',
    image: '/images/crispybirdbox.png',
    tags: ['best seller'],
    addOns: chickenAddOns,
  }),

  new MenuItem({
    id: 'burger-double-stack',
    name: 'Double Stack',
    description: 'Double Patty burger with a side of fries and fried onion rings.',
    price: 210,
    categoryId: 'burgers',
    image: '/images/doublestack.png',
    tags: ['best seller', 'new'],
    addOns: burgerAddOns,
  }),

  new MenuItem({
    id: 'chicken-sandwich',
    name: 'Chicken Sandwich',
    description: 'Best of both worlds mixed together for the perfect bite.',
    price: 180,
    categoryId: 'chicken',
    image: '/images/chickensandwhich.png',
    tags: ['best seller'],
    addOns: chickenAddOns,
  }),

  new MenuItem({
    id: 'burger-spicy-chicken',
    name: 'Spicy Bird Burger',
    description: 'Fiery fried chicken topped with spicy sauce and fresh lettuce.',
    price: 190,
    categoryId: 'burgers',
    image: '/images/spicyburger.png',
    tags: ['spicy'],
    addOns: burgerAddOns,
  }),

  new MenuItem({
    id: 'chicken-spicy-wings',
    name: 'Six-Piece Wings',
    description: 'Six crispy, golden wings tossed in your choice of sauce.',
    price: 160,
    categoryId: 'chicken',
    image: '/images/sixpiecewings.png',
    tags: ['spicy'],
    addOns: chickenAddOns,
  }),

  new MenuItem({
    id: 'side-potato-wedges',
    name: 'Loaded Fries',
    description: 'Golden fries smothered in warm cheese sauce and savory toppings.',
    price: 130,
    categoryId: 'sides',
    image: '/images/loadedfries.png',
    tags: ['new'],
    addOns: sidesAddOns,
  }),

  new MenuItem({
    id: 'burger-veggie',
    name: 'Veggie Stack',
    description: 'A thick plant-based patty stacked with fresh greens and house sauce.',
    price: 170,
    categoryId: 'burgers',
    image: '/images/veggiestack.png',
    tags: ['vegetarian-friendly'],
    addOns: [burgerAddOns[0], burgerAddOns[3]],
  }),
];

export const menuItemsMap = new Map(menuItems.map((item) => [item.id, item]));
