import React, { useEffect, useState } from 'react';
import client from '../../Sanity'; // Adjust path to your Sanity client file
import styles from './SecondAbout.module.css';
// import defaultImage from '../img/poly.jpg'; // Fallback image

function SecondAbout() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    
    const fetchAboutData = async () => {
      try {
        const query = `*[_type == "secondAbout"]{
          title,
          description,
          "imageUrl": image.asset->url,
          mission[]{
            heading,
            content
          }
        }`;

        const data = await client.fetch(query);
        setAboutData(data[0]); // Assuming a single document is fetched
      } catch (error) {
        console.error('Error fetching Second About data:', error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return <p>Loading...</p>;
  }

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Image Section */}
        <div className={styles.imageWrapper}>
          <img
            src={aboutData.imageUrl}
            alt="Eco-friendly bag"
            className={styles.image}
          />
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          <h2>{aboutData.title}</h2>
          <p>{aboutData.description}</p>

          {/* Mission Statement */}
          <div className={styles.mission}>
            <h3>Mission Statement:</h3>
            <ul>
              {aboutData.mission.map((item, index) => (
                <li key={index}>
                  <strong>{item.heading}:</strong> {item.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecondAbout;
