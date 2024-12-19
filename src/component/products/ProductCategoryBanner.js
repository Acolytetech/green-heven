import React, { useEffect, useState } from "react";
import client from "../../Sanity";
import styles from "./ProductCategoryBanner.module.css";

const ProductCategoryBanner = () => {
  const [getBannerData, setBannerData] = useState({});
  useEffect(() => {
    const fetchBannerData = async () => {
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
          const get_banner = data?.find(x => x.title === "Order online today");
          setBannerData(get_banner);
        } else {
          console.warn("No about data found.");
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchBannerData();
  }, []);

  // console.log("getBannerData", getBannerData);

  if (!getBannerData) {
    return <p>Loading...</p>;
  }

  return (
    <section
      className={styles.section}
      style={{
        
        backgroundImage: `url(${getBannerData?.backgroundimage?.asset.url})`,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backgroundSize: "cover",
        // backgroundPosition: "fill",
        backgroundBlendMode:'darken',
        // color: "white",
        height: "70vh",
      }}
    >
      <div className={styles.container}>
        <div className={styles.ourPartner}>
          <h3>{getBannerData?.title}</h3>
          {getBannerData?.paragraphs?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoryBanner;
