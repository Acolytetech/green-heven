import React from 'react';
import styles from './ThirdAbout.module.css';

function Use({ image, name, role, paragraphs }) {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Image Section */}
        <div className={styles.imageWrapper}>
          <img src={image} alt={`${name}'s photo`} className={styles.image} />
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          <h2>{name}</h2>
          <h4>{role}</h4>
          {paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Use;
