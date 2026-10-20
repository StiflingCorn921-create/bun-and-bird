import { Badge } from './Badge';

export function SectionHeading({ badge, title, subtitle, centered = false, className = '' }) {
  return (
    <div className={`space-y-3 ${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <div>
          <Badge variant="ketchup">{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg text-charcoal-muted max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
