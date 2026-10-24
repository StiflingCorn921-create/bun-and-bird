export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ariaLabel,
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ketchup disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-base gap-2',
    lg: 'px-6 py-3.5 text-lg gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-ketchup hover:bg-ketchup-hover text-cream shadow-sm hover:shadow-md',
    secondary: 'bg-mustard hover:bg-mustard-hover text-charcoal shadow-sm hover:shadow-md',
    outline: 'border-2 border-ketchup text-ketchup hover:bg-ketchup hover:text-cream',
    ghost: 'text-charcoal hover:bg-charcoal/10',
    danger: 'bg-red-700 hover:bg-red-800 text-cream',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`}
    >
      {children}
    </button>
  );
}

