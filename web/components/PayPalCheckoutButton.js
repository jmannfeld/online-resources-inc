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
                // the amount equals item_total plus tax_total plus shipping plus handling plus insurance minus shipping_discount minus discount.
                currency_code: 'USD',
                value: (
                  parseFloat(product.price) +
                  parseFloat(product.shipping) +
                  parseFloat(product.tax)
                ).toString(),
                breakdown: {
                  item_total: {
                    value: product.price,
                    currency_code: 'USD'
                  },
                  tax_total: {
                    value: product.tax,
                    currency_code: 'USD'
                  },
                  shipping: {
                    value: product.shipping,
                    currency_code: 'USD'
                  }
                }
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
