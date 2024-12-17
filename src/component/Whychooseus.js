import React, { useEffect, useState } from 'react';
import './Whychooesus.css';  // You can style it as needed
import createClient from '../Sanity';  // Import the Sanity client
import { PortableText } from '@portabletext/react';

const Whychooseus = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Sanity query to fetch the first "whychooseus" document
    const query = `*[_type == "whychooseus"][0] {
      backgroundImage {
        asset -> {
          url
        }
      },
      headline,
      whychooseslist
    }`;

    // Fetch the data
    createClient.fetch(query).then((result) => {
      setData(result);
    });
  }, []);

  if (!data) {
    return <div>Loading...</div>;  // Show loading state if data is not fetched yet
  }

  return (
    <div className="whychooesContainer">
      <div className="whychooesimg">
        <div className="imagebox">
          {/* Render background image from Sanity */}
          <img src={data.backgroundImage?.asset?.url || 'https://via.placeholder.com'} alt="Why Choose Us" />
        </div>
      </div>

      <div className="whychooescontent">
        <h2 className="mainheading">{data.headline}</h2>

        <div className="subarticle">
          {data.whychooseslist?.map((item, index) => (
            <div key={index} className="subitem">
              <h3 className="subheading">{item.subheading}</h3>

              {/* Render the rich text description */}
              <p  className="description-subheading" >
              {item.description && (
                <PortableText value={item.description} />
              )}
              </p>
          
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Whychooseus;
