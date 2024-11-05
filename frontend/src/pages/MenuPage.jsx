import React from 'react';
import MenuDisplay from '../components/MenuDisplay';
import ExploreMenu from '../components/ExploreMenu';

const MenuPage = ({category , setCategory}) => {
  return (
    <>
      <main >
        <ExploreMenu category={category} setCategory={setCategory}/>  
        <MenuDisplay category={category} setCategory={setCategory}/>
      </main>
    </>
  );
};

export default MenuPage;
