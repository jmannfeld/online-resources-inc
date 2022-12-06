import React, { useContext } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { CartContext } from './CartContext';
import styles from './ShoppingCartItem.module.css';

export default function ShoppingCartItem({ item }) {
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    const exist = cart.find((x) => x.name === item.name);
    if (exist) {
      setCart(cart.map((x) => (x.name === item.name ? { ...exist, qty: exist.qty + 1 } : x)));
    } else {
      setCart([
        ...cart,
        {
          ...item,
          qty: 1,
          price: Number(productToSell.price),
          shipping: Number(productToSell.shipping)
        }
      ]);
    }
  };

  const removeFromCart = () => {
    const exist = cart.find((x) => x.name === item.name);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x.name !== item.name));
    } else {
      setCart(cart.map((x) => (x.name === item.name ? { ...exist, qty: exist.qty - 1 } : x)));
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemHeading}>
        <p className={styles.cartItemName}>{`${item.name} - $${item.price}`}</p>
        <p className={styles.cartItemPrice}>${item.price * item.qty}</p>
      </div>
      <div className={styles.cartItemCounter}>
        <button onClick={removeFromCart}>
          <FiMinus />
        </button>
        <p>{item.qty}</p>
        <button onClick={addToCart}>
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
