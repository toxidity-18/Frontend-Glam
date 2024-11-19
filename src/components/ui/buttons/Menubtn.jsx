import React from 'react';
import styles from '@css/buttons/menubtn.module.css'; // Ensure you have the correct path to your CSS file

function Menubtn( {navShow, setNavShow} ) {

  const handleChange = () => {
    setNavShow(prev => !prev);
  };


  return (
    <div className={styles.switch}>
      <input type="checkbox" checked={navShow} onChange={handleChange} />
      <div>
        <span className={styles.line1}></span>
        <span className={styles.line2}></span>
        <span className={styles.line3}></span>
      </div>
    </div>
  );
}

export default Menubtn;
