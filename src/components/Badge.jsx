export function Badge({ children, variant = 'mustard', className = '' }) {
  const variantClasses = {
    mustard: 'bg-mustard text-charcoal font-bold',
    ketchup: 'bg-ketchup text-cream font-bold',
    charcoal: 'bg-charcoal text-cream font-medium',
    neutral: 'bg-cream-light text-charcoal border border-charcoal/15 font-semibold',
  };

  const selectedClass = variantClasses[variant] || variantClasses.mustard;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider ${selectedClass} ${className}`}>
      {children}
    </span>
  );
}
