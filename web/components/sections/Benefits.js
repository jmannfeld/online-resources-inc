import React from 'react';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';
import styles from './Benefits.module.css';
import SimpleBlockContent from '../SimpleBlockContent';
import Link from 'next/link';
import slugify from 'slugify';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function Benefits(props) {
  const { heading } = props;

  return (
    <div className={styles.benefitPageContainer}>
      {heading && (
        <div>
          <h3 className={styles.benefitsPageHeading}>{heading}</h3>
        </div>
      )}
      <div className={styles.benefitList}>
        <div className={styles.benefit}>
          <h3 className={styles.benefitTitle}>9x</h3>
          <h4 className={styles.benefitSubtitle}>the speed of a CMM</h4>
          <p className={styles.benefitText}>
            All 3D scanners are faster in 3D data capture than contact-based measurement solutions,
            acquiring millions of points per second and create a complete surface profile in that
            time.
          </p>
        </div>
        <div className={styles.benefit}>
          <h3 className={styles.benefitTitle}>100%</h3>
          <h4 className={styles.benefitSubtitle}>portable</h4>
          <p className={styles.benefitText}>
            Lightweight and fully portable, handheld 3D scanners can easily be taken anywhere,
            whether that&apos;s across the shop floor, or to another facility in a different
            country.
          </p>
        </div>
        <div className={styles.benefit}>
          <h3 className={styles.benefitTitle}>0</h3>
          <h4 className={styles.benefitSubtitle}>contact</h4>
          <p className={styles.benefitText}>
            All our scanners are Zero Contact, allowing you to scan a variety of surfaces without
            worrying about any risk of damage.
          </p>
        </div>
        <div className={styles.benefit}>
          <h3 className={styles.benefitTitle}>22</h3>
          <h4 className={styles.benefitSubtitle}>microns accuracy</h4>
          <p className={styles.benefitText}>
            Digitally capture auto parts, assemblies, and components with up to 0.0009 Inch (or 22
            microns) in accuracy.
          </p>
        </div>
        <div className={styles.benefit}>
          <h3 className={styles.benefitTitle}>&#60;1h</h3>
          <h4 className={styles.benefitSubtitle}>training needed</h4>
          <p className={styles.benefitText}>
            Handheld 3D scanners require very little training. In less than 1 hour you can be
            scanning your objects of choice, confidently and effectively.
          </p>
        </div>
      </div>
    </div>
  );
}

// Benefits.propTypes = {
//   title: PropTypes.string.isRequired,
//   route: PropTypes.shape({
//     slug: PropTypes.shape({
//       current: PropTypes.string
//     })
//   }),
//   link: PropTypes.string
// }

export default Benefits;
