import React, { useEffect, useState } from 'react';
import styles from './ThirdAbout.module.css';
// import { client } from '../Client'; // Adjust path as per your project structure
// import second from '../../../src/';
import client from '../../Sanity';

// Fetch Co-Founder Data
const fetchCoFounderData = async () => {
  const query = `*[_type == "fouthAbout"]{
    _id,
    name,
    role,
    description,
    "imageUrl": image.asset->url,
    "altText": image.alt
  }`;
  return await client.fetch(query);
};

function FourthAbout({ staticData }) {
  const [coFounders, setCoFounders] = useState(staticData || []);

  useEffect(() => {
    if (!staticData) {
      const getData = async () => {
        const data = await fetchCoFounderData();
        setCoFounders(data); // Fetch dynamic data only if staticData isn't provided
      };
      getData();
    }
  }, [staticData]);

  if (!coFounders.length) return <p>Loading...</p>;

  return (
    <section className={styles.aboutSection}>
      {coFounders.map((coFounder, index) => (
        <div key={coFounder._id || index} className={styles.container}>
          <div className={styles.content}>
            <h2>{coFounder.name}</h2>
            <h4>{coFounder.role}</h4>
            {coFounder.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className={styles.imageWrapper}>
            <img
              src={coFounder.imageUrl} // Fallback to static image
              alt={coFounder.altText}
              className={styles.image}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default FourthAbout;
