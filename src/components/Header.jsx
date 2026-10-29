import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteContent } from '../data/siteContent';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function Header({ itemCount: propItemCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const { itemCount: contextItemCount } = useCart();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const itemCount = propItemCount !== undefined ? propItemCount : contextItemCount;

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
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
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-charcoal/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            aria-label={siteContent.nav.brandAria}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ketchup rounded-lg p-1"
          >
            <img
              src="/images/Bun&Bird logo.jpg"
              alt={siteContent.brand.logoAlt}
              className="w-11 h-11 object-contain transition-transform group-hover:scale-110"
            />
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

          {/* Desktop Right CTA: Cart & Account */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal/5 border border-charcoal/10 text-xs font-bold text-charcoal hover:bg-charcoal/10 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-mustard text-charcoal font-black flex items-center justify-center text-[10px]">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name || 'Account'}</span>
                  <svg className="w-3.5 h-3.5 text-charcoal-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {accountMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-cream border-2 border-charcoal/15 rounded-2xl p-3 shadow-xl space-y-2 z-50 animate-in fade-in duration-150"
                    onMouseLeave={() => setAccountMenuOpen(false)}
                  >
                    <div className="px-2 py-1 border-b border-charcoal/10">
                      <span className="text-xs font-bold text-charcoal block truncate">
                        {user?.name || 'Account'}
                      </span>
                      <span className="text-[11px] text-charcoal-muted block truncate">
                        {user?.email || user?.phone || ''}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      {siteContent.auth.logoutBtn}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-xs font-bold text-charcoal hover:text-ketchup px-3 py-2 rounded-xl hover:bg-charcoal/5 transition-colors cursor-pointer"
              >
                {siteContent.nav.login}
              </button>
            )}

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
              className="p-2.5 rounded-xl text-charcoal hover:bg-charcoal/10 focus:outline-none focus:ring-2 focus:ring-ketchup active:scale-95 transition-transform cursor-pointer"
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

          {/* Mobile Auth button */}
          <div className="pt-2 border-t border-charcoal/10">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between p-3 bg-charcoal/5 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-charcoal block">
                    {user?.name || 'Account'}
                  </span>
                  <span className="text-[11px] text-charcoal-muted">
                    {user?.email || user?.phone || ''}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                >
                  {siteContent.auth.logoutBtn}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openAuthModal('login');
                }}
                className="w-full py-3 rounded-xl bg-charcoal text-cream font-bold text-sm text-center cursor-pointer"
              >
                {siteContent.nav.login} / {siteContent.auth.tabSignup}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
