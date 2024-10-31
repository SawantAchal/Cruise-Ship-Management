import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext'
import ItemCard from './ItemCard'

const MenuDisplay = ({category}) => {
    const {menuData} = useContext(StoreContext)
    useEffect(() => {
        console.log("Current Category:", category);
      }, [category]);
  return (
    <>
        <div>
            <div>
                <h2>MenuDisplay</h2>
            </div>
            <div>
                {
                    menuData.map((foodItem , index) => {
                        if (category==="All" || category.toLowerCase()===foodItem.category.toLowerCase()) {
                            return <ItemCard key={index} id={foodItem._id} name={foodItem.name} description={foodItem.description} price={foodItem.price} image={foodItem.image} category={foodItem.category}/>
                            
                        }
                    }
                    )
                }
            </div>
        </div>
    </>
  )
}

export default MenuDisplay