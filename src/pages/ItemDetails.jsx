import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allMenuItemsMap } from '../data';
import { siteContent } from '../data/siteContent';
import { useCart } from '../context/CartContext';
import { CartItem } from '../models/CartItem';
import { Combo } from '../models/Combo';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { QuantitySelector } from '../components/QuantitySelector';
import { FoodImage } from '../components/FoodImage';

export default function ItemDetails() {
  const { id } = useParams();
  const { addItem } = useCart();

  const item = useMemo(() => allMenuItemsMap.get(id), [id]);

  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [notification, setNotification] = useState(false);

  // If item not found, render Not Found state
  if (!item) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <span className="text-7xl block select-none">
          {siteContent.itemDetails.notFoundEmoji}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal">
          {siteContent.itemDetails.notFoundTitle}
        </h1>
        <p className="text-base text-charcoal-muted leading-relaxed">
          {siteContent.itemDetails.notFoundSubtitle}
        </p>
        <div>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold bg-ketchup text-cream hover:bg-ketchup-hover transition-colors shadow-sm"
          >
            {siteContent.itemDetails.backToMenuBtn}
          </Link>
        </div>
      </div>
    );
  }

  const isCombo = item instanceof Combo;
  const currency = siteContent.common.currencySymbol;

  // Calculate live dynamic prices
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
  const unitPrice = item.price + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleToggleAddOn = (addOn) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.id === addOn.id);
      if (exists) {
        return prev.filter((a) => a.id !== addOn.id);
      }
      return [...prev, addOn];
    });
  };

  const handleAddToCart = () => {
    const cartItem = new CartItem({
      menuItem: item,
      quantity,
      selectedAddOns: [...selectedAddOns],
    });

    addItem(cartItem);
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/menu"
          className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-ketchup hover:text-ketchup-hover transition-colors"
        >
          {siteContent.itemDetails.backBtn}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Food Image Tile */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full aspect-square rounded-3xl bg-amber-100/70 border-4 border-mustard/40 overflow-hidden shadow-md flex items-center justify-center">
            <FoodImage
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              containerClassName="w-full h-full"
            />
          </div>

          {/* Tags */}
          {Array.isArray(item.tags) && item.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={tag === 'best seller' ? 'mustard' : tag === 'spicy' ? 'ketchup' : 'neutral'}
                >
                  {siteContent.menu.tagLabels[tag] || tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Item Information & Customization */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
              {item.name}
            </h1>
            <p className="mt-3 text-base text-charcoal-muted leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Combo Special Information */}
          {isCombo && (
            <div className="bg-amber-100/60 border-2 border-mustard rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="ketchup">
                  {siteContent.itemDetails.comboSavingsPrefix}
                  {currency}
                  {item.getSavings()}
                </Badge>
                <span className="text-xs sm:text-sm font-semibold text-charcoal-muted">
                  {siteContent.itemDetails.comboTotalValuePrefix}
                  {currency}
                  {item.getTotalValue()}
                </span>
              </div>

              {Array.isArray(item.includedItems) && item.includedItems.length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-charcoal mb-2">
                    {siteContent.itemDetails.includedItemsTitle}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-charcoal">
                    {item.includedItems.map((inc) => (
                      <li key={inc.id} className="flex items-center gap-2">
                        <span className="font-medium">{inc.name}</span>
                        <span className="text-charcoal-muted ml-auto font-bold">
                          {currency}
                          {inc.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Add-ons List */}
          {Array.isArray(item.addOns) && item.addOns.length > 0 && (
            <div className="space-y-3 pt-2">
              <div>
                <h3 className="text-base font-black text-charcoal">
                  {siteContent.itemDetails.addOnsTitle}
                </h3>
                <p className="text-xs text-charcoal-muted">
                  {siteContent.itemDetails.addOnsSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.addOns.map((addOn) => {
                  const isChecked = selectedAddOns.some((a) => a.id === addOn.id);
                  return (
                    <label
                      key={addOn.id}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        isChecked
                          ? 'border-ketchup bg-amber-50'
                          : 'border-charcoal/10 bg-cream-light hover:border-charcoal/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleAddOn(addOn)}
                          className="w-4 h-4 text-ketchup accent-ketchup rounded focus:ring-ketchup cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-bold text-charcoal">
                          {addOn.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-ketchup whitespace-nowrap">
                        {siteContent.common.plus}
                        {currency}
                        {addOn.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing & Quantity Controls */}
          <div className="pt-6 border-t border-charcoal/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-charcoal-muted block font-semibold">
                  {siteContent.itemDetails.priceLabel}
                </span>
                <span className="text-3xl font-black text-ketchup">
                  {currency}
                  {totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-charcoal-muted hidden sm:inline">
                  {siteContent.itemDetails.quantityLabel}:
                </span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>
            </div>

            {/* Notification Alert */}
            {notification && (
              <div className="p-3 bg-mustard text-charcoal rounded-xl text-center font-bold text-sm shadow-xs animate-in fade-in duration-200">
                {siteContent.itemDetails.addedNotification}
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              type="button"
              size="lg"
              variant="primary"
              className="w-full text-base sm:text-lg shadow-md"
              onClick={handleAddToCart}
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>{siteContent.itemDetails.addToCartBtn}</span>
              <span>{siteContent.common.bullet}</span>
              <span>
                {currency}
                {totalPrice.toFixed(2)}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
