import React from 'react';    // Ensure React is imported (especially for TypeScript setups)

import Link from 'next/link';

import styles from "../page.module.css";

const Header = () => {
  return (

    <header className={styles.header}>
      <div className={styles['header-left']}>
        <button>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <figure>
          <img width="93px" alt="veronica logo" src="/path/to/image.jpg" />
        </figure>
        <nav>
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/">Ontdek</Link></li>
            <li><Link href="/">Radio</Link></li>
          </ol>
        </nav>
      </div>
      <div className={styles['header-right']}>
        {/* Add right-side content here */}
      </div>
    </header>
  );
};

export default Header;
