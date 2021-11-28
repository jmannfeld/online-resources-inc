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
  console.log('CompanyContact props', props);

  return (
    <div className={styles.companyContactContainer}>
      <h3>Phone</h3>
      <p>{phone}</p>
      <h3>Email</h3>
      <p>Sales: {salesEmail}</p>
      <p>Technical support: {supportEmail}</p>
      <h3>Address</h3>
      <address>
        <p>{title}</p>
        <p>{streetAddress}</p>
        <p>{`${city}, ${state} ${zipCode}`}</p>
      </address>
    </div>
  );
}

// TextSection.propTypes = {
//   heading: PropTypes.string,
//   label: PropTypes.string,
//   text: PropTypes.arrayOf(PropTypes.object)
// };

export default CompanyContact;
