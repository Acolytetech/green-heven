import React, { useEffect, useState } from "react";
import stylecss from "./subscription.module.css";
import createClient from "../Sanity"; // Ensure client is set up correctly
import { PortableText } from "@portabletext/react";

export default function Subscription({ navRef }) {
  const [subcontentdata, setSubcontentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchSubContentData = async () => {
      try {
        const data = await createClient.fetch(
          `*[_type == "subscriptiontext"] | order(publishedAt desc) {
            backgroundImage { asset -> { url } },
            sectionname,
            headline,
            subheadline,
            slug { current }
          }`
        );
        setSubcontentData(data);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubContentData();
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isValidEmail(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }
  
    setLoading(true);
    setStatus("");
  
    try {
      const response = await fetch("https://o6i5j6ls.api.sanity.io/v2022-03-07/data/query/production", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk9YOYIddacvvb3mhRDoW9yAHaZkpLWBCAnlDnfmWlYmaHhStA5Tef1gatdZvdopZHdF9y1N6yiLkmCBuBwCIKCCEfH4NuuWbVdShAmlLdOD6ET5dGe0DSqmPTMxWCuVWxOacdD6qlvNn4BOpTs8EgyoaA00pYDDXqw2fzWudJdGUCdOtjXn`,
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: "newsletter", // Your Sanity schema type
                email: email,
                subscribedAt: new Date().toISOString(),
              },
            },
          ],
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setStatus("Thank you for subscribing!");
        setEmail("");
      } else {
        console.error("Sanity API error:", result);
        setStatus("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
    <section className={stylecss.banner}>
      {subcontentdata.map((item) => (
        <div
          className={stylecss.bannerImage}
          key={item.slug.current}
          style={{
            background: `rgba(0,0,0,0.7) url(${item.backgroundImage.asset.url})`,
            backgroundBlendMode: "darken",
            backgroundSize: "cover",
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat'

          }}
        >
          <div className={stylecss.container}>
            <p className={stylecss.sectionname}>{item.sectionname}</p>
            <h2 className={stylecss.bannerHeading}>
              <PortableText value={item.headline || []} />
            </h2>
            <p className={stylecss.bannerPera}>
              <PortableText value={item.subheadline || []} />
            </p>
            <form className={stylecss.form} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter Your Email "
                className={stylecss.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={stylecss.button} disabled={loading}>
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {status && <p className={stylecss.status}>{status}</p>}
          </div>
        </div>
      ))}
    </section>
    <div className={stylecss.map}>

    <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d4173.028538920112!2d77.32491752056657!3d28.41669982041211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%3A%201176%2F17%20Faridabad%2C%20Haryana%20-%20121002!5e0!3m2!1sen!2sin!4v1733899375871!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

      </>
  );
}
