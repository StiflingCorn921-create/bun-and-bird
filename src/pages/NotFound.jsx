import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-7xl block select-none">
          {siteContent.brand.logoEmoji}
        </span>
        <div className="inline-block px-4 py-1 rounded-full bg-ketchup/10 text-ketchup font-black text-2xl">
          {siteContent.notFound.code}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal">
          {siteContent.notFound.title}
        </h1>
        <p className="text-charcoal-muted leading-relaxed">
          {siteContent.notFound.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-ketchup text-cream hover:bg-ketchup-hover transition-colors shadow-sm"
          >
            {siteContent.notFound.homeBtn}
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-mustard text-charcoal hover:bg-mustard-hover transition-colors shadow-sm"
          >
            {siteContent.notFound.menuBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}
