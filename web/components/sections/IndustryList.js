import React from 'react';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';
import styles from './IndustryList.module.css';
import SimpleBlockContent from '../SimpleBlockContent';
import Link from 'next/link';
import slugify from 'slugify';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function IndustryList(props) {
  const { subtitle, industries } = props;

  return (
    <div className={styles.industryListContainer}>
      {subtitle && (
        <div>
          <h3 className={styles.industryPageSubtitle}>{subtitle}</h3>
        </div>
      )}
      <div className={styles.industryList}>
        {industries.map((industry, ix) => {
          const indsutrySlug = slugify(industry.name, { lower: true });
          return (
            <div className={styles.galleryFigure} key={industry.name}>
              <Link
                href={{
                  pathname: '/LandingPage',
                  query: { slug: `industries/${indsutrySlug}` }
                }}
                as={`/industries/${indsutrySlug}`}
                prefetch
              >
                <a title={industry.name}>
                  <figure className={styles.industryFigure}>
                    <img
                      className={styles.industryImage}
                      src={industry.image ? urlFor(industry.image) : '../static/logo.png'}
                      alt={`${industry.name} industry card`}
                    ></img>
                    <h3 className={styles.industryName}>{industry.name}</h3>
                  </figure>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// IndustryList.propTypes = {
//   title: PropTypes.string.isRequired,
//   route: PropTypes.shape({
//     slug: PropTypes.shape({
//       current: PropTypes.string
//     })
//   }),
//   link: PropTypes.string
// }

export default IndustryList;
