// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import {toast} from 'react-toastify'

// const DisplayMenu = ({url}) => {
//   const [displayMenu , setDisplayMenu] = useState([])

//   const fetchAllProduct = async() => {
//     const response = await axios.get(`${url}/api/menu/all-menuItem`)
//     console.log(response.data)
//     if (response.data.success) {
//       setDisplayMenu(response.data.data)
//     }else{
//       toast.error('err')
//     }
//   }

//   const removeMenu = async (menuId) => {
//     // console.log("menuid" ,menuId)
//     const response = await axios.post(`${url}/api/menu/remove-menuItem` , {id:menuId})
//     await fetchAllProduct();
//     if (response.data.success) {
//       toast.success(response.data.success)
//     }else{
//       toast.error('error')
//     }
//   }

//   useEffect(() => {
//     fetchAllProduct()
//   },[]);

//   return (
//     <>
//       <div>
//         <h1>all menu list</h1>
//         <div>
//           <div>
//             <b>Image</b>
//             <b>name</b>
//             <b>category</b>
//             <b>price</b>
//             <b>action</b>
//           </div>
//           {
//             displayMenu.map((menu , index) => {
//               return (
//                 <div key={index}>
//                   <img src={`${url}/images/`+menu.image} alt='image'/>
//                   <p>{menu.name}</p>
//                   <p>{menu.category}</p>
//                   <p>{menu.price}</p>
//                   <p onClick={() => removeMenu(menu._id)}>X</p>
//                 </div>
//               )
//             })
//           }
//         </div>
//       </div>
//     </>
//   )
// }

// export default DisplayMenu

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DisplayMenu = ({ url }) => {
    const [displayMenu, setDisplayMenu] = useState([]);

    const fetchAllProduct = async () => {
        try {
            const response = await axios.get(`${url}/api/menu/all-menuItem`);
            if (response.data.success) {
                setDisplayMenu(response.data.data);
            } else {
                toast.error('Error fetching menu items.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching menu items.');
            console.error(error);
        }
    };

    const removeMenu = async (menuId) => {
        try {
            const response = await axios.post(`${url}/api/menu/remove-menuItem`, { id: menuId });
            await fetchAllProduct();
            if (response.data.success) {
                toast.success('Menu item removed successfully.');
            } else {
                toast.error('Error removing menu item.');
            }
        } catch (error) {
            toast.error('An error occurred while removing the menu item.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllProduct();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-5">All Menu List</h1>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-5 gap-4 text-center font-bold border-b pb-2">
                    <div>Image</div>
                    <div>Name</div>
                    <div>Category</div>
                    <div>Price</div>
                    <div>Action</div>
                </div>
                {displayMenu.map((menu, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 items-center border-b py-2">
                        <img
                            src={`${url}/images/${menu.image}`}
                            alt="Menu Item"
                            className="h-20 w-20 object-cover rounded"
                        />
                        <p>{menu.name}</p>
                        <p>{menu.category}</p>
                        <p>${menu.price.toFixed(2)}</p>
                        <p
                            onClick={() => removeMenu(menu._id)}
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

export default DisplayMenu;
