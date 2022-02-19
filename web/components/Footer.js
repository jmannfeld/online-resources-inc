import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import styles from './Footer.module.css';
import SimpleBlockContent from './SimpleBlockContent';
import SocialMedia from './SocialMedia';

function Footer(props) {
  const { navItems, text, socialMedia, router } = props;
  return (
    <div className={styles.root}>
      <SocialMedia links={socialMedia} />
      <nav>
        <ul className={styles.items}>
          {navItems &&
            navItems.map((item) => {
              // handle external URLs
              if (item.url) {
                return (
                  <li key={item._key} className={styles.item}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.navText}
                    </a>
                  </li>
                );
              }
              const isActive =
                router.pathname === '/LandingPage' && router.query.slug === item.slug.current;
              return (
                <li key={item._id} className={styles.item}>
                  <Link
                    href={{
                      pathname: '/LandingPage',
                      query: { slug: item.slug.current }
                    }}
                    as={item.slug.current === '/' ? '/' : `/${item.slug.current}`}
                    prefetch
                  >
                    <a data-is-active={isActive ? 'true' : 'false'}>{item.title}</a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
      <div className={styles.text}>
        <SimpleBlockContent blocks={text} />
      </div>
    </div>
  );
}

Footer.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.shape({
        current: PropTypes.string
      })
    })
  ),
  text: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.shape({
      slug: PropTypes.string
    })
  })
};

export default withRouter(Footer);
