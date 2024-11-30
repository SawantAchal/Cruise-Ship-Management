import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import ItemCard from './ItemCard';

const MenuDisplay = ({ category }) => {
    const { menuData } = useContext(StoreContext);

    useEffect(() => {

    }, [category]);

    return (
        <div className="py-8 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Menu Display</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    menuData.map((foodItem, index) => {
                        if (category === "All" || category.toLowerCase() === foodItem.category.toLowerCase()) {
                            return (
                                <ItemCard  key={index}  id={foodItem._id}  name={foodItem.name}  description={foodItem.description}  price={foodItem.price}  image={foodItem.image}  category={foodItem.category} />
                            );
                        }
                        return null;
                    })
                }
            </div>
        </div>
    );
}

export default MenuDisplay;
