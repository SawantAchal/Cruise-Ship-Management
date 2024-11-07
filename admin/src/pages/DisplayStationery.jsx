// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'

// const DisplayStationery = ({url}) => {
//   const [displayStationery , setDisplayStationery] = useState([])

//   const fetchAllStationery = async () => {
//     const response = await axios.get(`${url}/api/stationery/all-stationeryProduct`)
//     console.log('stationery : ' , response.data)
//     if (response.data.success) {
//       setDisplayStationery(response.data.data)
//     }else{
//       toast.error('err')
//     }
//   }

//   const removeStationery = async (stationeryId) => {
//     // console.log("stationeryId" ,stationeryId)
//     const response = await axios.post(`${url}/api/stationery/remove-stationeryProduct` , {id:stationeryId})
//     await fetchAllStationery();
//     if (response.data.success) {
//       toast.success(response.data.success)
//     }else{
//       toast.error('error')
//     }
//   }

//   useEffect(() => {
//     fetchAllStationery()
//   },[])

//   return (
//     <>
//       <div>
//         <h1>All stationey list</h1>
//         <div>
//           <div>
//             <b>Image</b>
//             <b>name</b>
//             <b>category</b>
//             <b>price</b>
//             <b>action</b>
//           </div>
//           {
//             displayStationery.map((item , index) => {
//               return (
//                 <div key={index}>
//                   <img src={`${url}/images/`+item.image} alt='image'/>
//                   <p>{item.name}</p>
//                   <p>{item.category}</p>
//                   <p>{item.price}</p>
//                   <p onClick={() =>  removeStationery(item._id)}>X</p>
//                 </div>
//               )
//             })
//           }
//         </div>
//       </div>
//     </>
//   )
// }

// export default DisplayStationery

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DisplayStationery = ({ url }) => {
    const [displayStationery, setDisplayStationery] = useState([]);

    const fetchAllStationery = async () => {
        try {
            const response = await axios.get(`${url}/api/stationery/all-stationeryProduct`);
            console.log('stationery: ', response.data);
            if (response.data.success) {
                setDisplayStationery(response.data.data);
            } else {
                toast.error('Error fetching stationery items.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching stationery items.');
            console.error(error);
        }
    };

    const removeStationery = async (stationeryId) => {
        try {
            const response = await axios.post(`${url}/api/stationery/remove-stationeryProduct`, { id: stationeryId });
            if (response.data.success) {
                await fetchAllStationery();
                toast.success('Stationery item removed successfully.');
            } else {
                toast.error('Error removing stationery item.');
            }
        } catch (error) {
            toast.error('An error occurred while removing the stationery item.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllStationery();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-5">All Stationery List</h1>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-5 gap-4 text-center font-bold border-b pb-2">
                    <div>Image</div>
                    <div>Name</div>
                    <div>Category</div>
                    <div>Price</div>
                    <div>Action</div>
                </div>
                {displayStationery.map((item, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 items-center border-b py-2">
                        <img
                            src={`${url}/images/${item.image}`}
                            alt="Stationery Item"
                            className="h-20 w-20 object-cover rounded"
                        />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <p
                            onClick={() => removeStationery(item._id)}
                            className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
                        >
                            Remove
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayStationery;
