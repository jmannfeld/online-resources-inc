import React from 'react';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';
import styles from './IndustryList.module.css';
import SimpleBlockContent from '../SimpleBlockContent';

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
          return (
            <div className={styles.galleryFigure} key={industry.name}>
              <figure className={styles.industryFigure}>
                <img
                  className={styles.industryImage}
                  src={industry.image ? urlFor(industry.image) : '../static/logo.png'}
                  alt={`${industry.name} industry card`}
                ></img>
                <h3 className={styles.industryName}>{industry.name}</h3>
              </figure>
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
