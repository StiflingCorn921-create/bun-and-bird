import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteContent } from '../data/siteContent';

export function Header({ itemCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm md:text-base font-bold transition-colors ${
      isActive
        ? 'text-ketchup bg-ketchup/10'
        : 'text-charcoal hover:text-ketchup hover:bg-charcoal/5'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-charcoal/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            aria-label={siteContent.nav.brandAria}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ketchup rounded-lg p-1"
          >
            <span className="text-3xl md:text-4xl transition-transform group-hover:scale-110 select-none">
              {siteContent.brand.logoEmoji}
            </span>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight text-ketchup uppercase">
                {siteContent.brand.name}
              </span>
              <span className="text-xs font-semibold text-charcoal-muted hidden sm:inline-block">
                {siteContent.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" end className={getNavLinkClass}>
              {siteContent.nav.home}
            </NavLink>
            <NavLink to="/menu" className={getNavLinkClass}>
              {siteContent.nav.menu}
            </NavLink>
            <NavLink to="/branches" className={getNavLinkClass}>
              {siteContent.nav.branches}
            </NavLink>
          </nav>

          {/* Desktop Right CTA: Cart & Order button */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/cart"
              aria-label={siteContent.nav.viewCartAria}
              className={({ isActive }) =>
                `relative inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  isActive
                    ? 'bg-ketchup text-cream shadow-md'
                    : 'bg-mustard text-charcoal hover:bg-mustard-hover shadow-xs'
                }`
              }
            >
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>{siteContent.nav.cart}</span>
              {itemCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-black bg-ketchup text-cream rounded-full border border-cream shadow-xs">
                  {itemCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* Mobile Right Controls: Cart Icon & Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <NavLink
              to="/cart"
              onClick={closeMobileMenu}
              aria-label={siteContent.nav.viewCartAria}
              className="relative p-2.5 rounded-xl bg-mustard text-charcoal active:scale-95 transition-transform"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-black bg-ketchup text-cream rounded-full border-2 border-cream">
                  {itemCount}
                </span>
              )}
            </NavLink>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? siteContent.nav.closeMenuAria : siteContent.nav.openMenuAria}
              className="p-2.5 rounded-xl text-charcoal hover:bg-charcoal/10 focus:outline-none focus:ring-2 focus:ring-ketchup active:scale-95 transition-transform"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-charcoal/10 bg-cream px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <NavLink
            to="/"
            end
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                isActive ? 'bg-ketchup text-cream' : 'text-charcoal hover:bg-charcoal/5'
              }`
            }
          >
            {siteContent.nav.home}
          </NavLink>
          <NavLink
            to="/menu"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                isActive ? 'bg-ketchup text-cream' : 'text-charcoal hover:bg-charcoal/5'
              }`
            }
          >
            {siteContent.nav.menu}
          </NavLink>
          <NavLink
            to="/branches"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                isActive ? 'bg-ketchup text-cream' : 'text-charcoal hover:bg-charcoal/5'
              }`
            }
          >
            {siteContent.nav.branches}
          </NavLink>
          <NavLink
            to="/cart"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                isActive ? 'bg-ketchup text-cream' : 'bg-mustard text-charcoal'
              }`
            }
          >
            <span>{siteContent.nav.cart}</span>
            {itemCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-black bg-ketchup text-cream rounded-full">
                {itemCount}
              </span>
            )}
          </NavLink>
        </div>
      )}
    </header>
  );
}
