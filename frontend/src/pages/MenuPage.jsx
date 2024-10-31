import React from 'react';
import MenuDisplay from '../components/MenuDisplay';
import ExploreMenu from '../components/ExploreMenu';

const MenuPage = () => {
  return (
    <>
      <main >
        <ExploreMenu category={category} setCategory={setCategory}/>  
        <MenuDisplay/>
      </main>
    </>
  );
};

export default MenuPage;
