import { siteContent } from '../data/siteContent';

export function QuantitySelector({
  quantity = 1,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  className = '',
}) {
  return (
    <div className={`inline-flex items-center rounded-xl bg-cream-light border-2 border-charcoal/15 p-1 ${className}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label={siteContent.itemDetails.decreaseAria}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-charcoal hover:bg-charcoal/10 disabled:opacity-30 disabled:hover:bg-transparent font-black text-lg transition-colors cursor-pointer select-none"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>

      <span className="w-10 text-center font-black text-base text-charcoal select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label={siteContent.itemDetails.increaseAria}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-charcoal hover:bg-charcoal/10 disabled:opacity-30 disabled:hover:bg-transparent font-black text-lg transition-colors cursor-pointer select-none"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

