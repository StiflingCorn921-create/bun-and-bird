import { Button } from './Button';

export function EmptyState({
  emoji = '🔍',
  title,
  subtitle,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`text-center py-16 px-4 max-w-md mx-auto space-y-4 ${className}`}>
      <span className="text-6xl sm:text-7xl block select-none mb-2">{emoji}</span>
      <h3 className="text-2xl font-black text-charcoal">{title}</h3>
      {subtitle && <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">{subtitle}</p>}
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button type="button" variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
