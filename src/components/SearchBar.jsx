import { siteContent } from '../data/siteContent';

export function SearchBar({ value, onChange, onClear, className = '' }) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-4 pointer-events-none text-charcoal-muted">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={siteContent.menu.searchPlaceholder}
        aria-label={siteContent.menu.searchAria}
        className="w-full pl-12 pr-10 py-3 rounded-2xl bg-cream-light border-2 border-charcoal/10 focus:border-ketchup focus:outline-none focus:ring-2 focus:ring-ketchup/20 text-charcoal placeholder-charcoal-muted/60 text-sm sm:text-base font-medium transition-all"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label={siteContent.menu.clearSearchAria}
          className="absolute right-3 p-1 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-charcoal/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
