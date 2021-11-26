import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import Link from 'next/link'
import styles from './ProductList.module.css'

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

function ProductList (props) {
  const {name, products} = props
  console.log('products', products)

  return (
    <div className={styles.productListContainer}>
      <h2>{name}</h2>
      <div className={styles.productList}>
        {products.map(product => {
          return (
            <Link
              href={{
                pathname: '/LandingPage',
                query: {slug: product.slug.current}
              }}
              as={`/products/${product.slug.current}`}
              className={styles.productLink}
            >
              <div className={styles.productItem}>
                <img className={styles.productImage} src={urlFor(product.image)}></img>
                <h3 className={styles.productName}>{product.name}</h3>
                <sub>{product.type}</sub>
                {/* <p>{product.description}</p> */}
              </div>
            </Link>
        )})}
      </div>
    </div>
  )
}

  // productList.propTypes = {
//   title: PropTypes.string.isRequired,
//   route: PropTypes.shape({
//     slug: PropTypes.shape({
//       current: PropTypes.string
//     })
//   }),
//   link: PropTypes.string
// }

export default ProductList
