// import React, { useContext, useEffect } from 'react'
// import { StoreContext } from '../context/StoreContext'
// import { stationery } from '../assets/menuData'
// import ItemCard from './ItemCard'

// const StationeryDisplay = ({category , setCategory}) => {
//     const {stationeryData} = useContext(StoreContext)

//     useEffect(() => {
//         console.log("Stationery Category:", category);
//       }, [category]);

//   return (
//     <>
//         <div className='bg-red-500'>
//             <h1>StationeryDisplay</h1>
//             <div>
//                 <div>
//                     <h2 className='text-center text-5xl'>Explore Stationary</h2>
//                 </div>
//                 <div className='bg-slate-400 flex gap-3'>
//                     {
//                         stationery.map((item , index) => (
//                             <div key={index} onClick={() => setCategory(prev => prev === item.stationery_name?'All' :item.stationery_name)}>
//                                 <p className={category===item.menu_name?"active" :''}>{item.stationery_name}</p>
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//             <div>
//                 <div>
//                     {
//                         stationeryData.map((stationeryItem , index) => {
//                             if (category==='All' || category.toLowerCase()===stationeryItem.category.toLowerCase()) {
//                                 return <ItemCard key={index} id={stationeryItem._id} name={stationeryItem.name} description={stationeryItem.description} image={stationeryItem.image} price={stationeryItem.price} category={stationeryItem.category}/>
//                             }
//                         })
//                     }
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default StationeryDisplay


import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { stationery } from '../assets/menuData';
import ItemCard from './ItemCard';

const StationeryDisplay = ({ category, setCategory }) => {
    const { stationeryData } = useContext(StoreContext);

    useEffect(() => {
        console.log("Stationery Category:", category);
    }, [category]);

    return (
        <div className="bg-gradient-to-b from-red-500 to-red-300 p-6">
            <h1 className="text-4xl font-bold text-center text-white mb-4">Stationery Display</h1>
            <h2 className="text-5xl font-semibold text-center text-white mb-6">Explore Stationery</h2>
            <div className="bg-gray-200 rounded-lg p-4 flex overflow-x-auto space-x-4">
                {
                    stationery.map((item, index) => (
                        <div 
                            key={index} 
                            onClick={() => setCategory(prev => (prev === item.stationery_name ? 'All' : item.stationery_name))} 
                            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${category === item.stationery_name ? 'bg-red-600 text-white' : 'text-red-600 hover:bg-red-100'}`}
                        >
                            {item.stationery_name}
                        </div>
                    ))
                }
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    stationeryData.map((stationeryItem, index) => {
                        if (category === 'All' || category.toLowerCase() === stationeryItem.category.toLowerCase()) {
                            return (
                                <ItemCard 
                                    key={index} 
                                    id={stationeryItem._id} 
                                    name={stationeryItem.name} 
                                    description={stationeryItem.description} 
                                    image={stationeryItem.image} 
                                    price={stationeryItem.price} 
                                    category={stationeryItem.category} 
                                />
                            );
                        }
                    })
                }
            </div>
        </div>
    );
}

export default StationeryDisplay;
