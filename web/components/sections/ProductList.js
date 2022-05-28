import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

  const [typeList, setTypeList] = useState(['All types', 'Hardware', 'Software']);
  const [typeSelected, setTypeSelected] = useState('All types');
  const [categorySelected, setCategorySelected] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const arrayUniqueCategories = [
    ...new Set(
      products
        .filter((product) => product.category.name !== undefined)
        .map((product) => product.category && product.category.name)
    )
  ];

  const arrayUniqueManufacturers = [
    ...new Set(
      products
        .filter((product) => product.manufacturer !== undefined)
        .map((product) => product.manufacturer && product.manufacturer.name)
    )
  ];

  const [manufacturersChecked, setManufacturersChecked] = useState(
    arrayUniqueManufacturers.reduce((accumulator, value) => {
      return { ...accumulator, [value]: false };
    }, {})
  );

  const handleManufacturerChange = (e) => {
    const { name } = e.target;
    setManufacturersChecked({
      ...manufacturersChecked,
      [name]: !manufacturersChecked[name]
    });
  };

  const checkedManufacturers = Object.entries(manufacturersChecked)
    .filter((manufacturer) => manufacturer[1])
    .map((manufacturer) => manufacturer[0]);

  const handleCategoryToggle = (newCategory) => {
    if (categorySelected === newCategory) {
      setCategorySelected(false);
    } else {
      setCategorySelected(newCategory);
    }
  };

  const handleTypeToggle = () => {
    typeList.push(typeList.shift());
    setTypeList(typeList);
    setTypeSelected(typeList[0]);
  };

  const filterByTypeSelected = (products) => {
    if (typeSelected !== 'All types') {
      return products.filter((product) => product.type === typeSelected);
    } else {
      return products;
    }
  };

  const filterByCategorySelected = (products) => {
    if (categorySelected) {
      return products.filter((product) => product.category.name === categorySelected);
    } else {
      return products;
    }
  };

  const filterByManufacturersChecked = (products) => {
    if (checkedManufacturers.length > 0) {
      return products.filter(
        (product) =>
          product.manufacturer && checkedManufacturers.includes(product.manufacturer.name)
      );
    } else {
      return products;
    }
  };

  const filterBySearchValue = (products) => {
    if (searchValue) {
      return products.filter((product) => product.name.match(new RegExp(searchValue, 'i')));
    } else {
      return products;
    }
  };

  useEffect(() => {
    // filter option has updated, so apply all filters here
    let result = products;
    result = filterByTypeSelected(result);
    result = filterByCategorySelected(result);
    result = filterByManufacturersChecked(result);
    result = filterBySearchValue(result);

    setFilteredProducts(result);
  }, [typeSelected, categorySelected, manufacturersChecked, searchValue]);

  return (
    <div className={styles.productLayoutWrapper}>
      <div className={styles.manufacturerFilterContainer}>
        <h4>Manufacturer</h4>
        {arrayUniqueManufacturers.map((manufacturer) => {
          return (
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id={manufacturer}
                name={manufacturer}
                className="manufacturer-checkbox"
                onChange={handleManufacturerChange}
              />
              <label htmlFor={manufacturer} className="checkboxLabel">
                {manufacturer}
              </label>
            </div>
          );
        })}
      </div>
      <div className={styles.productListContainer}>
        <h1>
          {name} ({products.length})
        </h1>
        <div className={styles.filterContainer}>
          <button
            onClick={handleTypeToggle}
            className={
              !typeSelected || typeSelected === 'All types'
                ? styles.filterButton
                : styles.filterButton + ' ' + styles.active
            }
          >
            {`${typeList[0]} (${filteredProducts.length})`}
          </button>
          <input
            className={styles.searchProducts}
            type="text"
            name="search"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
        </div>
        <div className={styles.categoryFilterContainer}>
          {arrayUniqueCategories.map((category) => {
            return (
              <button
                className={
                  categorySelected === category
                    ? styles.filterButton + ' ' + styles.active
                    : styles.filterButton
                }
                value={category}
                onClick={(e) => handleCategoryToggle(category)}
              >
                {category}
              </button>
            );
          })}
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
      <div className={styles.rightSidebar}></div>
    </div>
  );
}

export default ProductList;

ProductList.propTypes = {
  name: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object)
};
