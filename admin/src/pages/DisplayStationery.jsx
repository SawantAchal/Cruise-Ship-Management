// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// const DisplayStationery = ({ url }) => {
//     const [displayStationery, setDisplayStationery] = useState([]);

//     const fetchAllStationery = async () => {
//         try {
//             const response = await axios.get(`${url}/api/stationery/all-stationeryProduct`);
//             if (response.data.success) {
//                 setDisplayStationery(response.data.data);
//             } else {
//                 toast.error('Error fetching stationery items.');
//             }
//         } catch (error) {
//             toast.error('An error occurred while fetching stationery items.');
//             console.error(error);
//         }
//     };

//     const removeStationery = async (stationeryId) => {
//         try {
//             const response = await axios.post(`${url}/api/stationery/remove-stationeryProduct`, { id: stationeryId });
//             if (response.data.success) {
//                 await fetchAllStationery();
//                 toast.success('Stationery item removed successfully.');
//             } else {
//                 toast.error('Error removing stationery item.');
//             }
//         } catch (error) {
//             toast.error('An error occurred while removing the stationery item.');
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         fetchAllStationery();
//     }, []);

//     return (
//         <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold mb-5">All Stationery List</h1>
//             <div className="overflow-x-auto">
//                 <div className="grid grid-cols-5 gap-4 text-center font-bold border-b pb-2">
//                     <div>Image</div>
//                     <div>Name</div>
//                     <div>Category</div>
//                     <div>Price</div>
//                     <div>Action</div>
//                 </div>
//                 {displayStationery.map((item, index) => (
//                     <div key={index} className="grid grid-cols-5 gap-4 items-center border-b py-2">
//                         <img
//                             src={`${url}/images/${item.image}`}
//                             alt="Stationery Item"
//                             className="h-20 w-20 object-cover rounded"
//                         />
//                         <p>{item.name}</p>
//                         <p>{item.category}</p>
//                         <p>${item.price.toFixed(2)}</p>
//                         <p
//                             onClick={() => removeStationery(item._id)}
//                             className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
//                         >
//                             Remove
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DisplayStationery;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DisplayStationery = ({ url }) => {
    const [displayStationery, setDisplayStationery] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling

    const fetchAllStationery = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await axios.get(`${url}/api/stationery/all-stationeryProduct`);
            if (response.data.success) {
                setDisplayStationery(response.data.data);
            } else {
                toast.error('Error fetching stationery items.');
            }
        } catch (error) {
            setError('An error occurred while fetching stationery items.');
            toast.error('An error occurred while fetching stationery items.');
            console.error(error);
        } finally {
            setLoading(false); // Set loading to false when done
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

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

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
                        <button
                            onClick={() => removeStationery(item._id)}
                            className="text-red-500 hover:text-red-700 transition duration-200"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayStationery;
