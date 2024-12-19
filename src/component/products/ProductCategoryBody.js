import React, { useEffect, useState } from 'react';
import client from '../../Sanity'; // Adjust path to your Sanity client file
import styles from './ProductCategoryBody.module.css';

const ProductCategoryBody = () => {
    const [getBodyData,setBodyData] = useState([]);
    useEffect(() => {
    
        const fetchBodyData = async () => {
          try {
            const query = `*[_type == "categories"][0] {
              header,
              sub_header,
              product_image[] {
                image{
                  asset -> { url }
                },
                name
              }
            }`;
            const data = await client.fetch(query);
            if(data){
                setBodyData(data); // Assuming a single document is fetched
            }else{
                console.log("Unable to fetch data");
            }
          } catch (error) {
            console.error('Error fetching Second About data:', error);
          }
        };
    
        fetchBodyData();
      }, []);

      // console.log("getBodyData",getBodyData);

      if(!getBodyData){
        return <p>Loading...</p>;
      }

      const ProductCard = ({ name, image }) => (
        <div className={styles.productCard}>
          <img src={image} alt={name} className={styles.productImage} />
          <p className={styles.productName}>{name}</p>
        </div>
      );

  return (
    <div>
        <div className={styles.productHeaderSection}>
            <h2>{getBodyData?.header}</h2>
            <p>{getBodyData?.sub_header}</p>
        </div>
        <div className={styles.productsGrid}>
          {getBodyData?.product_image?.map((product,i) => (
            <ProductCard key={i} name={product.name} image={product.image.asset.url} />
          ))}
        </div>
    </div>
  )
}

export default ProductCategoryBody