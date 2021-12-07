import React from 'react';
import PropTypes from 'prop-types';
import SimpleBlockContent from '../SimpleBlockContent';
import styles from './CompanyContact.module.css';

function CompanyContact(props) {
  const { name, config } = props;
  const {
    title,
    phone,
    salesEmail,
    supportEmail,
    address: { streetAddress, city, state, zipCode }
  } = config;

  return (
    <div className={styles.companyContactWrapper}>
      <div>
        <h3>Located in Lebanon, Indiana</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3054.2153004046904!2d-86.47226328462662!3d40.04829597940974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88134e5d05d00af7%3A0x7db816a9205a8167!2sOnline%20Resources%20Inc!5e0!3m2!1sen!2sus!4v1636314871047!5m2!1sen!2sus"
          width="100%"
          height="500"
          style={{ border: '3px solid var(--color-accent)' }}
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className={styles.companyContactContainer}>
        <h3>Company Contact</h3>
        <h4>Phone</h4>
        <p>{phone}</p>
        <h4>Email</h4>
        <p>
          <span className={styles.companyContactSubHeading}>Sales:</span>
          <a href={`mailto:${salesEmail}`}>{salesEmail}</a>
        </p>
        <p>
          <span className={styles.companyContactSubHeading}>Technical Support:</span>
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </p>
        <h4>Address</h4>
        <address>
          <p>{title}</p>
          <p>{streetAddress}</p>
          <p>{`${city}, ${state} ${zipCode}`}</p>
        </address>
      </div>
    </div>
  );
}

// TextSection.propTypes = {
//   heading: PropTypes.string,
//   label: PropTypes.string,
//   text: PropTypes.arrayOf(PropTypes.object)
// };

export default CompanyContact;
