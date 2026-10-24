import { AddOn } from '../models/AddOn';

export const addOns = {
  extraCheese: new AddOn({ id: 'addon-cheese', name: 'Extra Melted Cheddar', price: 30 }),
  extraPatty: new AddOn({ id: 'addon-patty', name: 'Extra Beef Patty', price: 75 }),
  bacon: new AddOn({ id: 'addon-bacon', name: 'Crispy Smoked Bacon', price: 40 }),
  spicySauce: new AddOn({ id: 'addon-spicy-sauce', name: 'Fiery Ghost Pepper Sauce', price: 25 }),
  garlicMayo: new AddOn({ id: 'addon-garlic-mayo', name: 'Roasted Garlic Mayo Dip', price: 25 }),
  extraGravy: new AddOn({ id: 'addon-gravy', name: 'Signature Pepper Gravy', price: 25 }),
  upsizeFries: new AddOn({ id: 'addon-upsize-fries', name: 'Upsize to Jumbo Fries', price: 35 }),
  bbqDip: new AddOn({ id: 'addon-bbq-dip', name: 'Smoky BBQ Dip', price: 20 }),
};

export const burgerAddOns = [
  addOns.extraCheese,
  addOns.extraPatty,
  addOns.bacon,
  addOns.spicySauce,
  addOns.garlicMayo,
];

export const chickenAddOns = [
  addOns.extraGravy,
  addOns.spicySauce,
  addOns.garlicMayo,
  addOns.bbqDip,
];

export const sidesAddOns = [
  addOns.extraCheese,
  addOns.extraGravy,
  addOns.garlicMayo,
  addOns.bbqDip,
];

export const comboAddOns = [
  addOns.upsizeFries,
  addOns.extraCheese,
  addOns.extraGravy,
  addOns.bacon,
];

