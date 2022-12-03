import React from 'react';
import styles from './Badge.module.css';

export default function Badge({ count }) {
  return <div className={styles.badgeContainer}>{count}</div>;
}
