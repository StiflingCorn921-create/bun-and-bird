import { createContext, useContext, useState, useMemo } from 'react';
import { cartService } from '../services/cartService';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Load saved cart state from localStorage on init
  const [cart, setCart] = useState(() => cartService.loadCart());

  const addItem = (cartItem) => {
    setCart((prev) => cartService.addItem(prev, cartItem));
  };

  const removeItem = (id) => {
    setCart((prev) => cartService.removeItem(prev, id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) => cartService.updateQuantity(prev, id, quantity));
  };

  const applyPromo = (code) => {
    const result = cartService.applyPromo(cart, code);
    if (result.success) {
      setCart(result.cart);
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setCart((prev) => cartService.removePromo(prev));
  };

  const setOrderType = (orderType) => {
    setCart((prev) => cartService.setOrderType(prev, orderType));
  };

  const clearCart = () => {
    setCart((prev) => cartService.clearCart(prev));
  };

  const itemCount = useMemo(() => {
    return (cart.items || []).reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      applyPromo,
      removePromo,
      setOrderType,
      clearCart,
    }),
    [cart, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
