import React from 'react';
import carouselImages from '../assets/carousel';

const CruisePhoto = () => {
  return (
    <>
      <main>
        <h1 className="text-2xl font-bold mb-4">Photos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {carouselImages.map((image, index) => (
            <div key={index} className="w-full h-48 overflow-hidden">
              <img src={image} alt="" className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CruisePhoto;
