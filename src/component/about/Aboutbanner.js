import React, { useEffect, useState } from 'react';
import client from '../../Sanity'; // Adjust path to your Sanity client file
import styles from './About.module.css';

function Aboutbanner() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const query = `*[_type == "about"]{
          title,
          paragraphs,
          backgroundimage {
            asset -> {
              url
            }
          }
        }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setAboutData(data[0]); // Assuming only one document
        } else {
          console.warn('No about data found.');
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };
  
    fetchAboutData();
  }, []);
  



  if (!aboutData) {
    return <p>Loading...</p>;
  }

  return (
    <section className={styles.section} style={{  color: "white",
      background: `rgba(0,0,0,0.1) url(${aboutData.backgroundimage.asset.url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode:'darken',
      height:'100vh',
      }}>
      <div className={styles.container}>
        <div className={styles.ourPartner}>
          <h3>{aboutData.title}</h3>
          {aboutData.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Aboutbanner;
