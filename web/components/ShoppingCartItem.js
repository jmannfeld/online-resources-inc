import React, { useContext, useEffect } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { CartContext } from './CartContext';
import styles from './ShoppingCartItem.module.css';

export default function ShoppingCartItem({ item, discount }) {
  const [cart, setCart] = useContext(CartContext);
  const itemTotalPrice = item.price * item.qty;
  const discountedPrice = discount
    ? itemTotalPrice - (Number(itemTotalPrice) * Number(discount)) / 100
    : null;

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
          price: Number(item.price),
          discountedPrice: Number(discountedPrice),
          shipping: Number(item.shipping)
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
        {discount ? (
          <div className={styles.discountedPriceBlock}>
            <span className={styles.cartItemPrice}>
              <s>{`$${itemTotalPrice}`}</s>
            </span>
            <span className={styles.cartItemDiscountPrice}>{`$${parseFloat(discountedPrice).toFixed(
              2
            )}`}</span>
          </div>
        ) : (
          <p className={styles.cartItemPrice}>{`$${itemTotalPrice}`}</p>
        )}
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
