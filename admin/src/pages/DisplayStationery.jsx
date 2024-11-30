import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DisplayStationery = ({ url }) => {
    const [displayStationery, setDisplayStationery] = useState([]);

    const fetchAllStationery = async () => {
        try {
            const response = await axios.get(`${url}/api/stationery/all-stationeryProduct`);
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
