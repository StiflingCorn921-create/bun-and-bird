import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-auto border-t-4 border-mustard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link
              to="/"
              aria-label={siteContent.nav.brandAria}
              className="inline-flex items-center gap-3 group"
            >
              <span className="text-3xl md:text-4xl select-none">
                {siteContent.brand.logoEmoji}
              </span>
              <span className="text-2xl font-black tracking-tight text-mustard uppercase">
                {siteContent.brand.name}
              </span>
            </Link>
            <p className="text-sm md:text-base text-cream/80 max-w-md leading-relaxed">
              {siteContent.footer.brandDescription}
            </p>
            <p className="text-xs text-cream/50 pt-2 border-t border-cream/10">
              {siteContent.footer.studentExamNote}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-mustard uppercase tracking-wider">
              {siteContent.footer.navigationTitle}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-cream/80 hover:text-mustard transition-colors inline-block py-1"
                >
                  {siteContent.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-cream/80 hover:text-mustard transition-colors inline-block py-1"
                >
                  {siteContent.nav.menu}
                </Link>
              </li>
              <li>
                <Link
                  to="/branches"
                  className="text-cream/80 hover:text-mustard transition-colors inline-block py-1"
                >
                  {siteContent.nav.branches}
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-cream/80 hover:text-mustard transition-colors inline-block py-1"
                >
                  {siteContent.nav.cart}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-mustard uppercase tracking-wider">
              {siteContent.footer.contactTitle}
            </h3>
            <div className="space-y-2 text-sm text-cream/80">
              <p className="font-semibold">{siteContent.footer.customerCare}</p>
              <p>{siteContent.footer.email}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-4 text-center sm:text-left">
          <p>{siteContent.footer.copyright}</p>
          <p>{siteContent.brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
