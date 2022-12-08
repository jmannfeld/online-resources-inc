import React, { useState, useContext, useCallback } from 'react';
import Router from 'next/router';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { CartContext } from './CartContext';

function ShowPaymentSuccessPage(productDetails) {
  if (process.browser) {
    Router.push(
      {
        pathname: '/PaymentSuccessPage',
        query: { product: JSON.stringify(productDetails) }
      },
      '/payment-success'
    );
  }
}

function PaypalCheckoutButton() {
  const [cart, setCart] = useContext(CartContext);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [paypalOrder, setPaypalOrder] = useState(null);

  const totalPrice = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const totalShipping = cart.reduce((acc, curr) => acc + curr.shipping * curr.qty, 0);
  const totalTax = Number((totalPrice + totalShipping) * 0.07).toFixed(2);

  const handleApproval = (data, actions) => {
    // Call backend to fulfill the order

    // if response is successful
    setPaidFor(true);

    // if response is not successful
    // setError(
    //   'There was an error processing your order. Please contact us at 765-482-9700 for additional assistance.'
    // );
  };

  if (paidFor) {
    // Display a success message, modal to the buyer or take them to a success page
    ShowPaymentSuccessPage(cart);
    setCart([]);
  }

  if (error) {
    // Display an error message, modal to the buyer or take them to an error page
    alert(error);
  }

  const generatePaypalAmount = () => {
    const orderObject = {
      // the amount.value equals item_total plus tax_total plus shipping plus handling plus insurance minus shipping_discount minus discount.
      currency_code: 'USD',
      value: (
        parseFloat(totalPrice) +
        parseFloat(totalShipping) +
        Number((totalPrice + totalShipping) * 0.07)
      ).toString(),
      breakdown: {
        item_total: {
          value: totalPrice,
          currency_code: 'USD'
        },
        tax_total: {
          value: totalTax,
          currency_code: 'USD'
        },
        shipping: {
          value: totalShipping,
          currency_code: 'USD'
        }
      }
    };
    return orderObject;
  };

  const generatePaypalOrderObject = () => {
    const order = {
      description: 'Online Resources, Inc. Purchase',
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.qty,
        description: '3D Scanning',
        unit_amount: {
          value: item.price,
          currency_code: 'USD'
        }
      })),
      amount: generatePaypalAmount()
    };
    console.log('generatePaypalOrderObject', order);
    setPaypalOrder(order);
    return order;
  };

  const [orderID, setOrderID] = useState(false);

  // use useCallback to only update the value of `createOrder` when the `amount` changes
  const createOrder = useCallback(
    (data, actions) => {
      const newOrder = generatePaypalOrderObject();
      console.log('createOrder order', newOrder);

      return actions.order
        .create({
          purchase_units: [newOrder]
        })
        .then((orderID) => {
          setOrderID(orderID);
          return orderID;
        });
    },
    [cart]
  );

  return (
    <PayPalButtons
      createOrder={createOrder}
      forceReRender={[cart]}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log('Order summary', order);
        handleApproval(data.orderID);
      }}
      onCancel={() => {
        // Display cancel message, modal or take them to a cancel page
      }}
      onError={(err) => {
        setError(err);
        console.error(err);
      }}
    />
  );
}

export default PaypalCheckoutButton;
