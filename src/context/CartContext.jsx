import { createContext, useContext, useState, useMemo } from 'react';
import { Cart } from '../models/Cart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => new Cart([], null, 'pickup'));

  const addItem = (cartItem) => {
    setCart(prev => prev.addItem(cartItem));
  };

  const removeItem = (id) => {
    setCart(prev => prev.removeItem(id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(prev => prev.updateQuantity(id, quantity));
  };

  const applyPromo = (code) => {
    const freshCart = cart.clone();
    const success = freshCart.applyPromo(code);
    if (success) {
      setCart(freshCart);
    }
    return success;
  };

  const removePromo = () => {
    setCart(prev => prev.removePromo());
  };

  const setOrderType = (orderType) => {
    setCart(prev => prev.setOrderType(orderType));
  };

  const clearCart = () => {
    setCart(prev => prev.clear());
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

