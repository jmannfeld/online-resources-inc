import React, { useEffect } from 'react';
import styles from './OrderSummary.module.css';

export default function OrderSummary({ order }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPrice = order.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const totalShipping = order.reduce((acc, curr) => acc + curr.shipping * curr.qty, 0);
  const totalTax = Number(((totalPrice + totalShipping) * 0.07).toFixed(2));

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
          {order.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{`$${item.price}`}</td>
              <td>{item.qty}</td>
              <td>{`$${item.price * item.qty}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.priceBreakdownContainer}>
        <table className={styles.priceBreakdown}>
          <tr>
            <th>Subtotal</th>
            <td>{`$${totalPrice}`}</td>
          </tr>
          <tr>
            <th>Tax</th>
            <td>{`$${totalTax}`}</td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>{`$${totalShipping}`}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{`$${
              parseFloat(totalPrice) + parseFloat(totalShipping) + parseFloat(totalTax)
            }`}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
