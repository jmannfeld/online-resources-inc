import { set } from 'lodash';
import React, { useState } from 'react';

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartShow, setCartShow] = useState(false);
  // [
  //   { name: 'Peel 3', price: 88.0, qty: 1, unit_amount: { value: '88.00', currency_code: 'USD' } },
  //   { name: 'VIPeel', price: 99.0, qty: 1, unit_amount: { value: '99.00', currency_code: 'USD' } }
  // ];
  return (
    <CartContext.Provider value={[cart, setCart, cartShow, setCartShow]}>
      {children}
    </CartContext.Provider>
  );
};
