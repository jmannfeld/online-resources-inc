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
  const { name, products } = props;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryList, setCategoryList] = useState([
    'All categories',
    '3D Scanning',
    'CAD/CAM',
    'Inspection Software',
    'Reverse Engineering Software'
  ]);

  const [typeList, setTypeList] = useState(['All types', 'Hardware', 'Software']);

  const [categorySelected, setCategorySelected] = useState(false);
  const [typeSelected, setTypeSelected] = useState(false);

  const handleCategoryToggle = () => {
    categoryList.push(categoryList.shift());
    setCategoryList(categoryList);
    setCategorySelected(categoryList[0]);
  };

  const handleTypeToggle = () => {
    typeList.push(typeList.shift());
    setTypeList(typeList);
    setTypeSelected(typeList[0]);
    // setTypeSelected(!typeSelected);
  };

  useEffect(() => {
    const filteredList = products.filter((product) => {
      console.log('categoryList[0]', categoryList[0]);
      console.log('typeList[0]', typeList[0]);
      if (categoryList[0] === 'All categories' && typeList[0] === 'All types') {
        return true;
      } else {
        return (
          (categorySelected && product.category.name == categoryList[0]) ||
          (typeSelected && product.type == typeList[0])
        );
      }
    });
    console.log('filteredList', filteredList);
    setFilteredProducts(filteredList);
  }, [products, categorySelected, typeSelected]);

  console.log('categorySelected', categorySelected);
  return (
    <div className={styles.productListContainer}>
      <h1>
        {name} ({products.length})
      </h1>
      <div className={styles.filterContainer}>
        <button
          onClick={handleCategoryToggle}
          className={
            !categorySelected || categorySelected === 'All categories'
              ? styles.filterButton
              : styles.filterButton + ' ' + styles.active
          }
        >
          {categorySelected
            ? `${categoryList[0]} (${filteredProducts.length})`
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
          onClick={handleTypeToggle}
          className={
            !typeSelected || typeSelected === 'All types'
              ? styles.filterButton
              : styles.filterButton + ' ' + styles.active
          }
        >
          {typeSelected
            ? `${typeList[0]} (${filteredProducts.length})`
            : `All types (${typeList.length - 1})`}
        </button>
        <input className={styles.searchProducts} placeholder="Search products..."></input>
      </div>
      <div className={styles.productList}>
        {filteredProducts
          .sort((a, b) => {
            // sorts products asc by name
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          })
          .map((product) => {
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
                </div>
              </NextLink>
            );
          })}
      </div>
    </div>
  );
}

// ProductList.getInitialProps = async ({ props }) => {
//   console.log('in initial props');
//   const res = await client.fetch(productQuery);
//   const json = await res.json();
//   return { ...json };
// };

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
