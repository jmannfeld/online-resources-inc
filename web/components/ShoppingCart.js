import React from 'react';
import styles from './ShoppingCart.module.css';
import PaypalCheckoutButton from './PayPalCheckoutButton';

export default function ShoppingCart({
  items = [
    {
      name: 'Peel 3',
      quantity: '1',
      description: '',
      unit_amount: {
        value: '66.00',
        currency_code: 'USD'
      },
      image: 'url'
    },
    {
      name: 'Rugged case',
      quantity: '1',
      description: 'Case for your peel 3',
      unit_amount: {
        value: '33.00',
        currency_code: 'USD'
      }
    }
  ]
}) {
  return (
    <div className={styles.shoppingCartContainer}>
      <h1>{`Shopping Cart (${items.length})`}</h1>
      <div className={styles.cartItems}>
        {items.map((item) => (
          <div className={styles.cartItem}>
            <div className={styles.cartItemHeading}>
              <p className={styles.cartItemName}>{item.name}</p>
              <p className={styles.cartItemPrice}>${item.unit_amount.value}</p>
            </div>
            <div className={styles.cartItemCounter}>
              <button>-</button>
              <p>0</p>
              <button>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartSubtotal}>
        <p>Estimated Shipping: $233</p>
        <p>
          Subtotal ({items.length} items): <b>$60.43</b>
        </p>
        {/* <p>Proceed to checkout</p> */}
      </div>
      <PaypalCheckoutButton />
    </div>
  );
}
