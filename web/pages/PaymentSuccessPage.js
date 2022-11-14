import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import NextSeo from 'next-seo';
import styles from './PaymentSuccessPage.module.css';
import OrderSummary from '../components/OrderSummary';

import React, { useState, useEffect } from 'react';

function PaymentSuccessPage(props) {
  const { config } = props;
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    setOrderData(JSON.parse(props.router.query.product));
  }, [props.router.query]);

  return (
    <Layout config={config}>
      <NextSeo
        config={{
          title: 'Payment Successful',
          titleTemplate: `${config.title} | %s`,
          description: 'Thank you for your purchase!',
          canonical: config.url && `${config.url}/payment-success`,
          noindex: true
        }}
      />
      <div className={styles.successPageContainer}>
        <h1>Thank you for your purchase!</h1>
        <p>
          Please check your email for full order comfirmation details. You will receive shipping
          information within 2-3 business days.
        </p>
        {orderData && <OrderSummary order={orderData} />}
      </div>
    </Layout>
  );
}

export default withRouter(PaymentSuccessPage);
