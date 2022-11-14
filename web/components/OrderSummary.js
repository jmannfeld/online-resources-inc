import React, { useEffect } from 'react';
import styles from './OrderSummary.module.css';

export default function OrderSummary({ order }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.orderSummaryContainer}>
      <h2>Order Summary</h2>
      <table className={styles.orderSummary}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit price</th>
            <th>Quanity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.description}</td>
            <td>{`$${order.price}`}</td>
            <td>{1}</td>
            <td>{`$${order.price}`}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.priceBreakdownContainer}>
        <table className={styles.priceBreakdown}>
          <tr>
            <th>Subtotal</th>
            <td>{`$${order.price}`}</td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>{`$${order.shipping}`}</td>
          </tr>
          <tr>
            <th>Tax</th>
            <td>{`$${order.tax}`}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{`$${
              parseFloat(order.price) + parseFloat(order.shipping) + parseFloat(order.tax)
            }`}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
