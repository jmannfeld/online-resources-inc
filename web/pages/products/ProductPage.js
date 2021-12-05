import PropTypes from 'prop-types';
import React from 'react';
import NextSeo from 'next-seo';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import styles from './ProductPage.module.css';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';
import SimpleBlockContent from '../../components/SimpleBlockContent';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function ProductPage(props) {
  const urlPath = useRouter().asPath;
  const { config, products = [] } = props;
  console.log('ProductPage props', props);
  // if (products.length == 0) {
  //   console.log('returning early');
  //   return;
  // }
  console.log('urlPath', urlPath);
  // console.log('products', products);
  const product = products.filter((prod) => `/products/${prod.slug.current}` === urlPath)[0];
  console.log('PRODUCT DATA:', product);
  if (!product) {
    console.log('RETURNING NULL FOR:', urlPath);
    return null;
  }
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
      <NextSeo
        config={{
          title: name,
          titleTemplate: `${config.title} | %s`,
          description,
          canonical: config.url && `${config.url}/${product.slug.current}`,
          openGraph: {
            images: image
          },
          noindex: false
        }}
      />
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
        {description && (
          <div className={styles.productDescription}>
            <SimpleBlockContent blocks={description} />
          </div>
        )}
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
