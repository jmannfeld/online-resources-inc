import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';

import client from '../../client';
import Link from 'next/link';
import styles from './ProductList.module.css';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function NextLink(props) {
  const { href, as, linkKey, className, children, ...rest } = props;
  return (
    <Link href={href} as={as} key={linkKey}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

function ProductList(props) {
  // console.log('ProductList props', props);
  const { name } = props;
  // let products = props.products;
  const [products, setProducts] = useState(props.products);
  const [filterButtonText, setFilterButtonText] = useState('');
  const [categoryList, setCategoryList] = useState([
    '3D Scanning',
    'CAD/CAM',
    'Inspection Software',
    'Reverse Engineering',
    'All categories'
  ]);
  const [industryButtonText, setIndustryButtonText] = useState('');
  const [industryList, setIndustryList] = useState([
    'Education',
    'Aerospace & Defense',
    'Medical',
    'Automotive',
    'All industries'
  ]);
  const [typeButtonText, setTypeButtonText] = useState('');
  const [typeList, setTypeList] = useState(['Hardware', 'Software', 'All types']);

  const filterCategories = () => {
    setFilterButtonText(categoryList[0]);

    if (categoryList[0] === 'All categories') {
      setProducts(props.products);
    }

    if (!filterButtonText) {
      const filtered = props.products.filter((product) => product.category.name === '3D Scanners');
      setProducts(filtered);
    }
    if (filterButtonText && categoryList[0] !== 'All categories') {
      const filtered = props.products.filter(
        (product) => product.category.name === categoryList[0]
      );
      setProducts(filtered);
    }
    categoryList.push(categoryList.shift());
    setCategoryList(categoryList);
  };

  // const filterIndustries = () => {
  //   setIndustryButtonText(industryList[0]);

  //   if (industryList[0] === 'All industries') {
  //     setProducts(props.products);
  //   }

  //   if (!industryButtonText) {
  //     console.log('props.producys', props.products);
  //     const filtered = props.products.filter((product) => {
  //       if (product.industries) {
  //         if (product.industries.includes('Education')) console.log('industry found');
  //         return true;
  //       }
  //       return;
  //     });
  //     console.log('filtered', filtered);
  //     setProducts(filtered);
  //   }
  //   if (industryButtonText && industryList[0] !== 'All industries') {
  //     const filtered = props.products.filter((product) => {
  //       if (product.industries) {
  //         if (product.industries.includes(industryList[0])) {
  //           console.log('industry found');
  //           return true;
  //         }
  //       }
  //       return false;
  //     });
  //     console.log('filtered', filtered);
  //     setProducts(filtered);
  //   }
  //   industryList.push(industryList.shift());
  //   setIndustryList(industryList);
  //   console.log('industryList', industryList);
  // };

  const filterTypes = () => {
    setTypeButtonText(typeList[0]);

    if (typeList[0] === 'All types') {
      setProducts(props.products);
    }

    if (!typeButtonText) {
      const filtered = props.products.filter((product) => product.type === 'Hardware');
      setProducts(filtered);
    }
    if (typeButtonText && typeList[0] !== 'All types') {
      const filtered = props.products.filter((product) => product.type === typeList[0]);
      setProducts(filtered);
    }
    typeList.push(typeList.shift());
    setTypeList(typeList);
  };

  return (
    <div className={styles.productListContainer}>
      <h1>{name}</h1>
      <div className={styles.filterContainer}>
        <button
          onClick={filterCategories}
          className={
            !filterButtonText || filterButtonText === 'All categories'
              ? styles.filterButton
              : styles.filterButton + ' ' + styles.active
          }
        >
          {filterButtonText
            ? `${filterButtonText} (${products.length})`
            : `All categories (${categoryList.length - 1})`}
        </button>
        {/* <button
          onClick={filterIndustries}
          className={
            !industryButtonText || industryButtonText === 'All industries'
              ? styles.filterButton
              : styles.filterButton + ' ' + styles.active
          }
        >
          {industryButtonText
            ? `${industryButtonText} (${products.length})`
            : `All industries (${industryList.length - 1})`}
        </button> */}
        <button
          onClick={filterTypes}
          className={
            !typeButtonText || typeButtonText === 'All types'
              ? styles.filterButton
              : styles.filterButton + ' ' + styles.active
          }
        >
          {typeButtonText
            ? `${typeButtonText} (${products.length})`
            : `All types (${typeList.length - 1})`}
        </button>
      </div>
      <div className={styles.productList}>
        {products.map((product) => {
          return (
            <NextLink
              href={{
                pathname: '/products/ProductPage',
                query: { slug: product.slug.current }
              }}
              as={`/products/${product.slug.current}`}
              key={product.slug.current}
              tabIndex={0}
              className={styles.productLink}
            >
              <div className={styles.productItem}>
                <div className={styles.productImageWrapper}>
                  <div className={styles.imageCenter}>
                    <img
                      className={styles.productImage}
                      src={product.image ? urlFor(product.image) : '../static/logo.png'}
                    ></img>
                  </div>
                  <h3 className={styles.productName}>{product.name}</h3>
                </div>
                {/* <p>{product.description}</p> */}
              </div>
            </NextLink>
          );
        })}
      </div>
    </div>
  );
}

ProductList.getInitialProps = async ({ props }) => {
  console.log('in initial props');
  const res = await client.fetch(productQuery);
  const json = await res.json();
  return { ...json };
};

// productList.propTypes = {
//   title: PropTypes.string.isRequired,
//   route: PropTypes.shape({
//     slug: PropTypes.shape({
//       current: PropTypes.string
//     })
//   }),
//   link: PropTypes.string
// }

export default ProductList;
