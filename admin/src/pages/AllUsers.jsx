// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const AllUsers = ({url}) => {
//     const [allUserList , setAllUserList] = useState([])

//     const fetchAllUsers = async() => {
//         const response = await axios.get(`${url}/api/user/all-user`)
//         if (response.data.success) {
//             setAllUserList(response.data.data)
//         }else{
//             toast.error('err')
//         }
//     }

//     useEffect(() => {
//         fetchAllUsers()
//     },[])

//   return (
//     <>
//         <div className='ml-60'>
//             <h1>All users</h1>
//             <div>
//                 {
//                     allUserList.map((user,index) => {
//                         return (
//                             <div key={index} className='pt-5 pb-5'>
//                                 <p>{user.name}</p>
//                                 {
//                                     Array.isArray(user.cartData) ? (
//                                         <div>
//                                             <h6>Cart items</h6>
//                                             {
//                                                 user.cartData.map((item , idx) => (
//                                                     <div>
//                                                         <p>Item Name: {item.name}</p>
//                                                         <p>Quantity: {item.quantity}</p>
//                                                     </div>
//                                                 ))
//                                             }
//                                         </div>
//                                     ) : (
//                                         <p>Cart data is not available or not an array</p>
//                                     )
//                                 }
//                                 <p>{user.email}</p>
//                                 <p>{user.createdAt}</p>
//                                 <hr/>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     </>
//   )
// }

// export default AllUsers



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = ({ url }) => {
  const [allUserList, setAllUserList] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/all-user`);
      if (response.data.success) {
        setAllUserList(response.data.data);
      } else {
        console.error('Error fetching users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6  ml-32">All Users</h1>

      <div className="space-y-6">
        {allUserList.map((user, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            {/* User Info */}
            <div className="mb-4">
              <p className="text-xl font-bold text-gray-700">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Cart Data */}
            {Array.isArray(user.cartData) && user.cartData.length > 0 ? (
              <div className="mt-4">
                <h6 className="text-lg font-semibold text-gray-700">Cart Items</h6>
                <div className="space-y-2">
                  {user.cartData.map((item, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      <p><strong>Item Name:</strong> {item.name}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-red-600 mt-2">No cart data available or data is not in the correct format</p>
            )}

            {/* Divider */}
            <hr className="my-4 border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
