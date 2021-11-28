import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import styles from './ProductPage.module.css';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function ProductPage(props) {
  const urlPath = useRouter().asPath;
  const { config, products = [] } = props;
  const product = products.filter((prod) => `/products/${prod.slug.current}` === urlPath)[0];
  console.log('PRODUCT DATA:', product);
  const {
    name,
    type,
    description,
    image,
    manufacturer: { name: manufacturer } = '',
    category: { name: category } = '',
    techSpecs = {}
  } = product;
  return (
    <Layout config={config}>
      <div className={styles.productPageContainer}>
        <h1 className={styles.productName}>{name}</h1>
        <p className={styles.manufacturerName}>{manufacturer}</p>
        <div className={styles.productTags}>
          <p>
            {category.slice(-1) === 's' ? category.substring(0, category.length - 1) : category}
          </p>
          <p>{type}</p>
        </div>
        {image && (
          <img
            className={styles.productImage}
            src={image ? urlFor(image) : '../static/logo.png'}
          ></img>
        )}
        <table>
          <tbody>
            {techSpecs &&
              Object.entries(techSpecs).map(([key, value]) => {
                if (!key.startsWith('_'))
                  return (
                    <tr key={key}>
                      <th>{key.toUpperCase()}</th>
                      <td>{value}</td>
                    </tr>
                  );
              })}
          </tbody>
        </table>
        <p>{description}</p>
      </div>
    </Layout>
  );
}

ProductPage.getInitialProps = async ({ props }) => {
  return { ...props };
};
// ProductPage.propTypes = {
//   config: PropTypes.object
// };

export default ProductPage;
