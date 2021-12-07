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
  console.log('indsutry props', props);

  return (
    <div className={styles.industryListContainer}>
      {subtitle && <h2 className={styles.industryPageSubtitle}>{subtitle}</h2>}
      <div className={styles.industryList}>
        {industries.map((industry) => {
          return (
            <div className={styles.industryItem} key={industry.name}>
              <div>
                <h3 className={styles.industryName}>{industry.name}</h3>
                <div className={styles.industryDescription}>
                  <SimpleBlockContent blocks={industry.description} />
                </div>
              </div>
              <img
                className={styles.industryImage}
                src={industry.image ? urlFor(industry.image) : '../static/logo.png'}
              ></img>
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
