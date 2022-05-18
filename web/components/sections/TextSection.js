import React from 'react';
import PropTypes from 'prop-types';
import SimpleBlockContent from '../SimpleBlockContent';
import styles from './TextSection.module.css';

function TextSection(props) {
  const { heading, label, text } = props;
  let isTwitter = false;
  if (heading && heading.toLowerCase().includes('twitter')) {
    isTwitter = true;
  }

  return (
    <div className={isTwitter ? styles.twitterRoot : styles.root}>
      <section className={styles.article}>
        {label && <div className={styles.label}>{label}</div>}
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        {text && <SimpleBlockContent blocks={text} />}
      </section>
    </div>
  );
}

TextSection.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.arrayOf(PropTypes.object)
};

export default TextSection;
