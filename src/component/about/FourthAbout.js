import React, { useEffect, useState } from 'react';
import styles from './fourthAbout.module.css';
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

  const coFounders1 = coFounders?.find(coFounders => coFounders.name === 'Akshit Kapoor');
  const coFounders2 = coFounders?.find(coFounders => coFounders.name === 'Puneet Wadhwa');
console.log(coFounders1)
  return (
    <section className={styles.aboutSection}>
    
        
        <div key={coFounders1._id} className={styles.container1}>
           <div className={styles.imageWrapper}>
            <img
              src={coFounders1.imageUrl} // Fallback to static image
              alt={coFounders1.altText}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h2>{coFounders1.name}</h2>
            <p className={styles.role}>{coFounders1.role}</p>
            {coFounders1?.description?.map((para,i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
         
        </div>
{/* co Founder 2 */}
        <div key={coFounders2._id} className={styles.container2}>
           
          <div className={styles.content}>
            <h2>{coFounders2.name}</h2>
            <p className={styles.role}>{coFounders2.role}</p>
            {coFounders2.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className={styles.imageWrapper}>
            <img
              src={coFounders2.imageUrl} // Fallback to static image
              alt={coFounders2.altText}
              className={styles.image}
            />
          </div>
         
        </div>
   
    </section>
  );
}

export default FourthAbout;
