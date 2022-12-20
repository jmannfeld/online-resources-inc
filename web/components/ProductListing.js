import React, { useContext } from 'react';
import styles from './ProductListing.module.css';
import { CartContext } from './CartContext';
import { FiShoppingCart } from 'react-icons/fi';

export default function ProductListing({ productToSell, disabled }) {
  const [cart, setCart, showCart, setShowCart] = useContext(CartContext);

  const addToCart = () => {
    const exist = cart.find((x) => x.name === productToSell.name);
    if (exist) {
      setCart(
        cart.map((x) => (x.name === productToSell.name ? { ...exist, qty: exist.qty + 1 } : x))
      );
    } else {
      setCart([
        ...cart,
        {
          ...productToSell,
          qty: 1,
          price: Number(productToSell.price),
          shipping: Number(productToSell.shipping),
          discountedPrice: Number(productToSell.price)
        }
      ]);
    }
    setShowCart(true);
  };

  return (
    <div className={styles.productToSell} key={productToSell.name}>
      <div className={styles.productToSellDetails}>
        <p className={styles.productToSellName}>{`${productToSell.name}`}</p>
        <p className={styles.productToSellPrice}>{`$${productToSell.price}`}</p>
      </div>
      <button className={styles.addToCart} type="button" onClick={addToCart} disabled={disabled}>
        <span>Add to Cart</span>
        <FiShoppingCart />
      </button>
    </div>
  );
}
