import React from 'react';
import styles from '@css/buttons/shinebtn.module.css';

function ShineBtn({ onClickBtn, children }) {
  return (
    <button className={`${styles.btnshine} ${styles.hbutton}`} onClick={onClickBtn}>
      <span>
        {children}
      </span>
    </button>
  );
}

export default ShineBtn;
