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

  const [typeList, setTypeList] = useState(['All types', 'Hardware', 'Software']);
  const [typeSelected, setTypeSelected] = useState(false);

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

  const manufacturerFilterObj = {};
  const [manufacturers, setManufacturers] = useState(
    arrayUniqueManufacturers.reduce((accumulator, value) => {
      return { ...accumulator, [value]: false };
    }, {})
  );
  // arrayUniqueManufacturers.forEach((manufacturer) => {
  //   manufacturerFilterObj[manufacturer] = false;
  // });
  console.log(manufacturers);

  const handleManufacturerChange = (e) => {
    const { name } = e.target;
    setManufacturers({
      ...manufacturers,
      [name]: !manufacturers[name]
    });
  };

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

  const checkedManufacturers = Object.entries(manufacturers)
    .filter((manufacturer) => manufacturer[1])
    .map((manufacturer) => manufacturer[0]);
  console.log('checkedManufacturers', checkedManufacturers);

  const isOfType = (product) => {
    if (product.type === typeList[0]) {
      console.log('is of type');
      return true;
    } else {
      return false;
    }
  };

  const isCategory = (product) => {
    if (product.category.name === categorySelected) {
      console.log('is in category');
      return true;
    } else {
      return false;
    }
  };

  const isFromManufacturer = (product) => {
    if (checkedManufacturers.length === 0) return true;
    if (
      checkedManufacturers.length > 0 &&
      product.manufacturer &&
      checkedManufacturers.includes(product.manufacturer.name)
    ) {
      console.log('is from manu');
      return true;
    }
  };

  useEffect(() => {
    const filteredList = products.filter((product) => {
      // console.log('product', product);
      // return isOfType(product) || isCategory(product) || isFromManufacturer(product);
      return isOfType(product) || isCategory(product);
    });
    // } else if (
    //   checkedManufacturers.length > 0 &&
    //   product.manufacturer &&
    //   checkedManufacturers.includes(product.manufacturer.name)
    // ) {
    //   return true;
    // } else if (typeList[0] === 'All types') {
    // console.log('typeList[0]', typeList[0]);
    // return true;
    console.log('filteredList', filteredList);
    setFilteredProducts(filteredList);
  }, [products, categorySelected, typeSelected, manufacturers]);

  console.log('categorySelected', categorySelected);
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
          {/* <button
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
          {filteredProducts > 0
            ? products
            : filteredProducts
                .sort((a, b) => {
                  // sorts products asc by name
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  return 0;
                })
                .filter((product) => isFromManufacturer(product))
                .filter((product) => product.name.match(new RegExp(searchValue, 'i')))
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
