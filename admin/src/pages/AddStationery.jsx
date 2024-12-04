// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AddStationery = ({ url }) => {
//     const [image, setImage] = useState(null);
//     const [data, setData] = useState({
//         name: '',
//         description: '',
//         price: '',
//         category: 'Gift Items',
//     });

//     const onChangeHandler = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setData((prev) => ({ ...prev, [name]: value }));
//     };

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', data.name);
//         formData.append('description', data.description);
//         formData.append('price', Number(data.price));
//         formData.append('category', data.category);
//         formData.append('image', image);

//         try {
//             const response = await axios.post(`${url}/api/stationery/add-stationery`, formData);
//             if (response.data.success) {
//                 setData({
//                     name: '',
//                     description: '',
//                     price: '',
//                     category: 'Gift Items',
//                 });
//                 setImage(null);
//             } else {
//                 console.error(response.data.message);
//             }
//         } catch (error) {
//             console.error('Error adding product:', error);
//         }
//     };

//     useEffect(() => {
        
//     }, [data]);

//     return (
//         <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold mb-5">Add Stationery</h1>
//             <form onSubmit={onSubmitHandler}>
//                 <div className="mb-4">
//                     <label htmlFor="image" className="block text-sm font-medium text-gray-700">
//                         Upload Image
//                     </label>
//                     <label htmlFor="image" className="block cursor-pointer">
//                         <img src={image ? URL.createObjectURL(image) : ''} alt="Upload" className="h-20 w-20 mb-2 border border-gray-300 rounded" />
//                     </label>
//                     <input name="image" onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                         Product Name
//                     </label>
//                     <input
//                         onChange={onChangeHandler}
//                         value={data.name}
//                         type="text"
//                         name="name"
//                         placeholder="Type here"
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                         Product Description
//                     </label>
//                     <textarea
//                         onChange={onChangeHandler}
//                         value={data.description}
//                         name="description"
//                         rows={4}
//                         placeholder="Type here"
//                         required
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                         Category
//                     </label>
//                     <select
//                         name="category"
//                         onChange={onChangeHandler}
//                         value={data.category}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     >
//                         <option value="Gift Items">Gift Items</option>
//                         <option value="Chocolates">Chocolates</option>
//                         <option value="Tale Books">Tale Books</option>
//                     </select>
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//                         Product Price
//                     </label>
//                     <input
//                         onChange={onChangeHandler}
//                         value={data.price}
//                         type="number"
//                         name="price"
//                         placeholder="$40"
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-200"
//                 >
//                     Add Product
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddStationery;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddStationery = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Gift Items',
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('image', image);

        try {
            const response = await axios.post(`${url}/api/stationery/add-stationery`, formData);
            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Gift Items',
                });
                setImage(null);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    useEffect(() => {
        
    }, [data]);

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add Stationery</h1>
            <form onSubmit={onSubmitHandler}>
                {/* Image Upload Section */}
                <div className="mb-6">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image
                    </label>
                    <div className="flex justify-center">
                        <label htmlFor="image" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-5 hover:bg-gray-100 transition duration-200">
                            <img
                                src={image ? URL.createObjectURL(image) : ''}
                                alt="Image Preview"
                                className="h-32 w-32 object-cover mb-2 mx-auto rounded-lg"
                            />
                            <div className="text-center text-sm text-gray-600">
                                {image ? 'Change Image' : 'Click to upload image'}
                            </div>
                        </label>
                    </div>
                    <input
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                {/* Product Name */}
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                    </label>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Description
                    </label>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows={4}
                        placeholder="Enter product description"
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        onChange={onChangeHandler}
                        value={data.category}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Gift Items">Gift Items</option>
                        <option value="Chocolates">Chocolates</option>
                        <option value="Tale Books">Tale Books</option>
                    </select>
                </div>

                {/* Product Price */}
                <div className="mb-6">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Price
                    </label>
                    <input
                        onChange={onChangeHandler}
                        value={data.price}
                        type="number"
                        name="price"
                        placeholder="$40"
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddStationery;
