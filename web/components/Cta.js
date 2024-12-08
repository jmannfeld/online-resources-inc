import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './Cta.module.css';
import { FiExternalLink } from 'react-icons/fi';

function cta(props) {
  let { title, route, link, color = 'white' } = props;

  console.log('CTA', props);

  // Handle CTAs within portableText
  if (props.node) {
    console.log('Portable CTA', props.node);
    link = props.node.link;
    title = props.node.title;
    color = props.node.color.toLowerCase();
  }

  // If the route is a product, link to the product page
  if (route && route._type === 'product') {
    return (
      <Link
        href={{
          pathname: '/products/ProductPage',
          query: { slug: route.slug.current }
        }}
        as={`/products/${route.slug.current}`}
      >
        <a className={`${styles.button} ${styles[color]}`}>{title}</a>
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
        <a className={`${styles.button} ${styles[color]}`}>{title}</a>
      </Link>
    );
  }

  // If there is a link provided, it should be an external link
  if (link) {
    return (
      <a className={`${styles.button} ${styles[color]}`} href={link} target="_blank">
        {title} <FiExternalLink />
      </a>
    );
  }

  return <a className={`${styles.button} ${styles[color]}`}>{title}</a>;
}

cta.propTypes = {
  title: PropTypes.string,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string
    })
  }),
  link: PropTypes.string
};

export default cta;
