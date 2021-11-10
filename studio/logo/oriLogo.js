import React from 'react'
import styles from './oriLogo.css'

const oriLogo = () => (
  <div className={styles.logoWrapper}>
    <img
      src="../static/images/logo.png"
      alt="Online Resources, Inc. logo in green text"
      className={styles.oriLogo}
    />
    <h1 className={styles.h1}>Content Studio</h1>
  </div>
)

export default oriLogo
