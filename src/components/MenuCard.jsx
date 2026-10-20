import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './Badge';
import { Button } from './Button';
import { siteContent } from '../data/siteContent';
import { useCart } from '../context/CartContext';
import { CartItem } from '../models/CartItem';
import { Combo } from '../models/Combo';

export function MenuCard({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem = new CartItem({
      menuItem: item,
      quantity: 1,
      selectedAddOns: [],
    });

    addItem(cartItem);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  const isCombo = item instanceof Combo;
  const currency = siteContent.common.currencySymbol;

  return (
    <div className="group bg-cream-light border-2 border-charcoal/10 hover:border-ketchup/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl relative overflow-hidden">
      {/* Top Section: Emoji Tile & Tags */}
      <div>
        <Link
          to={`/menu/${item.id}`}
          className="block relative aspect-4/3 w-full rounded-xl bg-amber-100/60 flex items-center justify-center overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform"
        >
          <span className="text-6xl sm:text-7xl select-none transition-transform group-hover:rotate-3 duration-200">
            {item.image}
          </span>

          {isCombo && (
            <div className="absolute top-2.5 right-2.5">
              <Badge variant="ketchup">
                {siteContent.itemDetails.comboSavingsPrefix}
                {currency}
                {item.getSavings()}
              </Badge>
            </div>
          )}
        </Link>

        {/* Tags */}
        {Array.isArray(item.tags) && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
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

        {/* Item Title */}
        <Link to={`/menu/${item.id}`} className="block focus:outline-none">
          <h3 className="text-xl font-black text-charcoal group-hover:text-ketchup transition-colors line-clamp-1">
            {item.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-1.5 text-xs sm:text-sm text-charcoal-muted line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Combo Included Items Preview */}
        {isCombo && Array.isArray(item.includedItems) && item.includedItems.length > 0 && (
          <div className="mt-2 text-xs text-charcoal/70 bg-charcoal/5 px-2.5 py-1.5 rounded-lg line-clamp-1">
            <span className="font-bold">{siteContent.itemDetails.includedItemsTitle} </span>
            {item.includedItems.map((inc) => inc.name).join(siteContent.common.separator)}
          </div>
        )}
      </div>

      {/* Bottom Section: Price & Action Buttons */}
      <div className="mt-5 pt-4 border-t border-charcoal/10 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-charcoal-muted block font-semibold">
            {siteContent.itemDetails.priceLabel}
          </span>
          <span className="text-xl sm:text-2xl font-black text-ketchup">
            {item.getFormattedPrice()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={justAdded ? 'secondary' : 'primary'}
            onClick={handleQuickAdd}
            ariaLabel={`${siteContent.menu.addToCartBtn} ${item.name}`}
          >
            {justAdded ? (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {siteContent.itemDetails.addedNotification}
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {siteContent.menu.addToCartBtn}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
