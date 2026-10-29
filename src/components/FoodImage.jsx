import { useState } from 'react';

export function FoodImage({ src, alt = 'Food Item', className = '', containerClassName = '' }) {
  const [hasError, setHasError] = useState(false);

  // Fallback if emoji was passed
  const isEmoji =
    typeof src === 'string' &&
    src.length <= 4 &&
    !src.includes('/') &&
    !src.includes('.');

  if (isEmoji) {
    return <span className={`select-none ${className}`}>{src}</span>;
  }

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200/80 text-charcoal/70 p-4 select-none text-center ${
          containerClassName || className
        }`}
      >
        <svg
          className="w-10 h-10 mb-1 text-ketchup/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs font-black text-charcoal/80 uppercase tracking-wider line-clamp-1">
          {alt}
        </span>
        <span className="text-[10px] text-charcoal-muted mt-0.5">Photo placeholder</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
      loading="lazy"
    />
  );
}

