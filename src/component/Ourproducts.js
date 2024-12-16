import React, { useEffect, useState } from 'react';
import './Ourproducts.css';
import createClient from '../Sanity';
// import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";


const Ourproducts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    // Fetch Product Data
    useEffect(() => {
        createClient
            .fetch(
                `*[_type == "ourproducts"]{
                  title,
                  description,
                  price,
                  image {
                    asset -> {
                      url
                    }
                  }
                }`
            )
            .then((data) => setProducts(data))
            .catch((err) => {
                console.error("Error fetching product data:", err);
                setError(true);
            });
    }, []);

    if (error) return <div>Error loading products. Please try again later.</div>;
    if (!products.length) return <div>Loading...</div>;

    return (
        <div className="ourproducts">
            <p className='sectionHeading'>Our Products</p>
            <h1 className='mainHeading'>Our Most Loved Products</h1>
            <div className="productsContainer">
                {products.map((item, index) => (
                    <div key={index} className="product-details">
                        <div className="productimg">
                            {/* <h2 style={{color:'white',backgroundColor:'#5863479a',padding:'10px',top:'3%', borderRadius:'20px',right:'26.5%' ,position:'absolute'}}>{item.price || ['00']} RS</h2> */}
                        {item.image?.asset?.url && (
                           <img 
                                className="productImage"
                                src={item.image.asset.url}
                                alt={item.title}
                            />
                            
                        )}

                        </div>
                      
                        <p className="productName">{item.title}</p>
                        <button className='btn '>View Product</button>
                        <button className='btn2 '>Get Quote</button>
                    </div>
                ))}
            </div>
            <button className='btn Explorebtn'>Explore All Products <IoIosArrowRoundForward className='span'/></button>
        </div>
    );
};

export default Ourproducts;
