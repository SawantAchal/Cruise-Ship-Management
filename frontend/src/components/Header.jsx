import React from 'react';
import bg from '../assets/bg3.jpg';

const Header = () => {
  return (
    <>
      <main
        className="w-full h-screen"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.9)', // Optional: Adjust brightness if needed
        }}
      >
        
      </main>
    </>
  );
};

export default Header;
