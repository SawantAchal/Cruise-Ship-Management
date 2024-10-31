import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext'
import { stationery } from '../assets/menuData'
import ItemCard from './ItemCard'

const StationeryDisplay = ({category , setCategory}) => {
    const {stationeryMenu} = useContext(StoreContext)

    useEffect(() => {
        console.log("Stationery Category:", category);
      }, [category]);

  return (
    <>
        <div className='bg-red-500'>
            <h1>StationeryDisplay</h1>
            <div>
                <div>
                    <h2 className='text-center text-5xl'>Explore Stationary</h2>
                </div>
                <div className='bg-slate-400 flex gap-3'>
                    {
                        stationery.map((item , index) => (
                            <div key={index} onClick={() => setCategory(prev => prev === item.stationery_name?'All' :item.stationery_name)}>
                                <p className={category===item.menu_name?"active" :''}>{item.stationery_name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <div>
                    {
                        stationeryMenu.map((stationeryItem , index) => {
                            if (category==='All' || category.toLowerCase()===stationeryItem.category.toLowerCase()) {
                                return <ItemCard key={index} id={stationeryItem._id} name={stationeryItem.name} description={stationeryItem.description} image={stationeryItem.image} price={stationeryItem.price} category={stationeryItem.category}/>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default StationeryDisplay