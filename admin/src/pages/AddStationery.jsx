// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const AddStationery = ({url}) => {
//     const [image , setImage] = useState(false)
//     const [data , setData] = useState({
//         name:'',
//         description:'',
//         price:'',
//         category:'Gift Items'
//     })

//     const onChangeHandler =(e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setData(data=> ({...data,[name]:value}))
//     }

//     const onSubmitHandler = async(e) => {
//         e.preventDefault()
//         const formData = new FormData();
//         formData.append("name" , data.name)
//         formData.append("description" , data.description)
//         formData.append("price" , Number(data.price))
//         formData.append("category" , data.category)
//         formData.append("image" , image)
//         const response = await axios.post(`${url}/api/stationery/add-stationery` , formData)
//         if (response.data.success) {
//             setData(
//                 {
//                     name:'',
//                     description:'',
//                     price:'',
//                     category:'Gift Items'
//                 }
//             )
//             setImage(false)
//         } else {
            
//         }
//     }

//     useEffect(() =>{
//         console.log(' stationery data' , data)
//     },[data])
//   return (
//     <>
//     <div>
//         <h1>ADD stationery</h1>
//         <form onSubmit={onSubmitHandler}>
//             <div>
//                 <p>Upload image</p>
//                 <label htmlFor='image'>
//                     <img src={image?URL.createObjectURL(image):''} alt='upload image' className='h-20 w-20'/>
//                 </label>
//                 <input name='image' onChange={(e)=> setImage(e.target.files[0])} type='file' id='image' hidden required/>
//             </div>
//             <div>
//                 <p>Product name</p>
//                 <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='type here' />
//             </div>
//             <div>
//                 <p>Product des</p>
//                 <textarea  onChange={onChangeHandler} value={data.description} name='description' rows={6} placeholder='type here' required />
//             </div>
//             <div>
//                 <div>
//                     <p>category</p>
//                     <select name='category'  onChange={onChangeHandler} value={data.category}>
//                         <option value="Gift Items">Gift Items</option>
//                         <option value="Chocolates">Chocolates</option>
//                         <option value="Tale Books">Tale Books</option>
//                     </select>
//                 </div>
//                 <div>
//                     <p>Product price</p>
//                     <input  onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='$40'/>
//                 </div>
//             </div>
//             <button type='submit'>Add product</button>
//         </form>
//     </div>
// </>
//   )
// }

// export default AddStationery

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
        console.log('Stationery data:', data);
    }, [data]);

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-5">Add Stationery</h1>
            <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Upload Image
                    </label>
                    <label htmlFor="image" className="block cursor-pointer">
                        <img src={image ? URL.createObjectURL(image) : ''} alt="Upload" className="h-20 w-20 mb-2 border border-gray-300 rounded" />
                    </label>
                    <input name="image" onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Product Description
                    </label>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows={4}
                        placeholder="Type here"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="category"
                        onChange={onChangeHandler}
                        value={data.category}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                        <option value="Gift Items">Gift Items</option>
                        <option value="Chocolates">Chocolates</option>
                        <option value="Tale Books">Tale Books</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Product Price
                    </label>
                    <input
                        onChange={onChangeHandler}
                        value={data.price}
                        type="number"
                        name="price"
                        placeholder="$40"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddStationery;
