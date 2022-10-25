import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PaypalCheckoutButton = (props) => {
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

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
    alert('Thank you for your purchase!');
  }

  if (error) {
    // Display an error message, modal to the buyer or take them to an error page
    alert(error);
  }

  return (
    <PayPalButtons
      onClick={(data, actions) => {}}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: {
                value: product.price
              }
            }
          ]
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log('order', order);
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
};

export default PaypalCheckoutButton;
