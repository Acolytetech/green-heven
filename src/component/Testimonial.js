import React, { useEffect, useState } from "react";
import testcss from "./testimonial.module.css"; // Ensure the path to your CSS module is correct
import createClient from "../Sanity"; // Ensure client is set up correctly
import { PortableText } from "@portabletext/react"; // For rich text rendering
import './herosection.module.css';
import { BiSolidQuoteLeft } from "react-icons/bi";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper testcss
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Testimonial({ navRef }) {
    const [testimonialData, setTestimonialData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the testimonial data from Sanity
        const fetchTestimonialData = async () => {
            try {
                const data = await createClient.fetch(
                    `*[_type == "testimonial"] | order(publishedAt desc) {
                        backgroundImage {
                            asset -> {
                                url
                            }
                        },
                        sectionname,
                        headline,
                        subheadline,
                        slug {
                            current
                        },
                        author,
                        location
                    }`
                );
                setTestimonialData(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch testimonial data:", error);
                setLoading(false);
            }
        };

        fetchTestimonialData();
    }, []);

    // Show loading indicator
    if (loading) {
        return <div className={testcss.loading}>Loading...</div>;
    }

    // Show error message if no data is available
    if (!testimonialData.length) {
        return <div className={testcss.error}>No testimonial data found.</div>;
    }

    return (
        <>
  
    
            <Swiper
            className={testcss.banner}
            loop={true}
            navigation={false}
            pagination={true}
            scrollbar={{ draggable: true }}
            slidesPerView={1}
            // spaceBetween={0}
            

                
            >
                {testimonialData.map((item) => (
                    <SwiperSlide key={item.slug.current}>
                        <div
                            className={testcss.bannerImage}
                            style={{
                                background: `rgba(0,0,0,0.5) url(${item.backgroundImage.asset.url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundBlendMode:'darken',
                                color: "white",
                            }}
                        >
                            <div className={testcss.container}>
                                {/* Banner Section Name */}
                                <span className={testcss.sectionName}>{item.sectionname}</span>

                                {/* Headline */}
                                <h2 className={testcss.bannerHeading}>
                                    <PortableText value={item.headline || []} />
                                </h2>

                                {/* Subheadline with Quote Icon */}
                                <p className={testcss.bannerPera}>
                                    <BiSolidQuoteLeft className={testcss.quoteIcon} />
                                    <PortableText value={item.subheadline || []} />
                                </p>

                                {/* Author and Location */}
                                {item.author && item.location && (
                                    <div className={testcss.testimonialAuthor}>
                                        <h3>{item.author}</h3>
                                        <p>{item.location}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
       

        </>
    );
}
