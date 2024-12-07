import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './Cta.module.css';
import { FiExternalLink } from 'react-icons/fi';

function cta(props) {
  const { title, route, link } = props;

  // If the route is a product, link to the product page
  if (route._type === 'product') {
    return (
      <Link
        href={{
          pathname: '/products/ProductPage',
          query: { slug: route.slug.current }
        }}
        as={`/products/${route.slug.current}`}
      >
        <a className={styles.button}>{title}</a>
      </Link>
    );
  }

  // If the route is a page, link to the page
  if (route && route.slug && route.slug.current) {
    const isServiceForm = route.slug.current.toLowerCase() === 'services';
    return (
      <Link
        href={{
          pathname: '/LandingPage',
          query: { slug: route.slug.current }
        }}
        as={isServiceForm ? `/${route.slug.current}#service-form` : `/${route.slug.current}`}
      >
        <a className={styles.button}>{title}</a>
      </Link>
    );
  }

  // If there is a link provided, it should be an external link
  if (link) {
    return (
      <a className={styles.button} href={link} target="_blank">
        {title} <FiExternalLink />
      </a>
    );
  }

  return <a className={styles.button}>{title}</a>;
}

cta.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string
    })
  }),
  link: PropTypes.string
};

export default cta;
