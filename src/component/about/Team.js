import React from 'react';
import Use from './Use';
// import akshitImage from '../img/Second.jpg';
// import puneetImage from '../img/poly.jpg';

function Team() {
  return (
    <div>
   
      <Use
        // image={puneetImage}
        name="Puneet Wadhwa"
        role="Co-Founder"
        paragraphs={[
          'A dedicated advocate and director at Wadhwa & Co., Puneet brings years of experience in digital design and strategic direction to Green Haven.',
          'He believes in integrating ethical practices with high-quality craftsmanship to offer exceptional, sustainable luxury products.',
        ]}
      />
    </div>
  );
}

export default Team;
