import { createContext, useContext, useState, useMemo } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (credentials) => {
    const loggedInUser = authService.login(credentials);
    setUser(loggedInUser);
    setIsAuthModalOpen(false);
    return loggedInUser;
  };

  const signup = (userData) => {
    const newUser = authService.signup(userData);
    setUser(newUser);
    setIsAuthModalOpen(false);
    return newUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      openAuthModal,
      closeAuthModal,
      login,
      signup,
      logout,
    }),
    [user, isAuthModalOpen, authModalMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
