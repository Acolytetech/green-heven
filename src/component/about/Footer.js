import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.quickLinks}>
        <h3>Quick Links</h3>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Our Products</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className={styles.contact}>
        <h3>Contact</h3>
        <p>Email: info@kapsonglobex.com</p>
        <p>Phone: +91 9716006599</p>
        <p>Phone: +91 9897632166</p>
        <p>Address: 1176/17 Faridabad, Haryana - 121002</p>
      </div>
      <div className={styles.social}>
        <h3>Follow Us On</h3>
        <div className={styles.icons}>
          <FaFacebookF className={styles.icon} />
          <FaLinkedinIn className={styles.icon} />
          <FaInstagram className={styles.icon} />
        </div>
      </div>
      <div className={styles.copyright}>
        Greenhaven.eco © Copyright 2024. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
