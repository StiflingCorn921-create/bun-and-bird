import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { siteContent } from '../data/siteContent';
import { Button } from './Button';

export function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    closeAuthModal,
    login,
    signup,
  } = useAuth();

  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Reset form when modal opens or mode changes
  useEffect(() => {
    setError('');
  }, [isAuthModalOpen, authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        login({ identifier, password });
      } else {
        const isEmail = identifier.includes('@');
        signup({
          name,
          email: isEmail ? identifier : '',
          phone: !isEmail ? identifier : '',
          password,
        });
      }
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md bg-cream border-2 border-charcoal/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-charcoal/5 transition-colors cursor-pointer"
          aria-label={siteContent.common.closeAria}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 border border-mustard/40 flex items-center justify-center text-2xl select-none mb-3">
            🍔
          </div>
          <h2 className="text-2xl font-black text-charcoal">
            {authModalMode === 'login'
              ? siteContent.auth.loginTitle
              : siteContent.auth.signupTitle}
          </h2>
          <p className="text-xs text-charcoal-muted">
            {siteContent.auth.loginSubtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-amber-100/60 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('login');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authModalMode === 'login'
                ? 'bg-cream text-charcoal shadow-xs'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {siteContent.auth.tabLogin}
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('signup');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authModalMode === 'signup'
                ? 'bg-cream text-charcoal shadow-xs'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {siteContent.auth.tabSignup}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'signup' && (
            <div>
              <label className="text-xs font-bold text-charcoal-muted block mb-1">
                {siteContent.auth.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={siteContent.auth.namePlaceholder}
                className="w-full px-4 py-2.5 rounded-xl bg-cream-light border-2 border-charcoal/15 text-charcoal text-sm font-medium focus:border-ketchup focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-charcoal-muted block mb-1">
              {siteContent.auth.identifierLabel}
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={siteContent.auth.identifierPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-cream-light border-2 border-charcoal/15 text-charcoal text-sm font-medium focus:border-ketchup focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-charcoal-muted block mb-1">
              {siteContent.auth.passwordLabel}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={siteContent.auth.passwordPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-cream-light border-2 border-charcoal/15 text-charcoal text-sm font-medium focus:border-ketchup focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading}
            className="w-full text-base shadow-md mt-2"
          >
            {authModalMode === 'login'
              ? siteContent.auth.loginSubmit
              : siteContent.auth.signupSubmit}
          </Button>
        </form>

        {/* Bottom hint */}
        <div className="text-center pt-2 border-t border-charcoal/10">
          <p className="text-[11px] text-charcoal-muted">
            Simple & fast login • No confirmation codes required
          </p>
        </div>
      </div>
    </div>
  );
}
