import React from 'react';
import styles from '@css/helpers/sysload.module.css';

function SysLoader() {
  return (
    /* From Uiverse.io by andrew-demchenk0 */
    <div className={styles.pyramidloader}>
      <div className={styles.wrapper}>
        <span className={`${styles.side} ${styles.side1}`}></span>
        <span className={`${styles.side} ${styles.side2}`}></span>
        <span className={`${styles.side} ${styles.side3}`}></span>
        <span className={`${styles.side} ${styles.side4}`}></span>
        <span className={styles.shadow}></span>
      </div>
      <i>Loading...</i>
    </div>
  );
}

export default SysLoader;
