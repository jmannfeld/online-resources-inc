import React from 'react';
import PropTypes from 'prop-types';
import SimpleBlockContent from '../SimpleBlockContent';
import styles from './TextSectionSplit.module.css';

function TextSectionSplit(props) {
  const { heading1, label1, text1, heading2, label2, text2 } = props;
  console.log('in TextSectionSplit');
  return (
    <div className={styles.root}>
      <section className={styles.article}>
        <div className={styles.label}>{label1 ? label1 : ''}</div>
        {heading1 && <h2 className={styles.heading}>{heading1}</h2>}
        {text1 && <SimpleBlockContent blocks={text1} />}
      </section>
      <section className={styles.article}>
        {label2 && <div className={styles.label}>{label2}</div>}
        {heading2 && <h2 className={styles.heading}>{heading2}</h2>}
        {text2 && <SimpleBlockContent blocks={text2} />}
      </section>
    </div>
  );
}

TextSectionSplit.propTypes = {
  heading1: PropTypes.string,
  label1: PropTypes.string,
  text1: PropTypes.arrayOf(PropTypes.object),
  heading2: PropTypes.string,
  label2: PropTypes.string,
  text2: PropTypes.arrayOf(PropTypes.object)
};

export default TextSectionSplit;
