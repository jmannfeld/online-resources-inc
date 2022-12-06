import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { PayPalButtons } from '@paypal/react-paypal-js';

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
    ShowPaymentSuccessPage(product);
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
              description: product.name,
              items: [
                {
                  name: 'Peel 3',
                  quantity: '1',
                  description: product.description,
                  unit_amount: {
                    value: '66.00',
                    currency_code: 'USD'
                  }
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
              ],
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
