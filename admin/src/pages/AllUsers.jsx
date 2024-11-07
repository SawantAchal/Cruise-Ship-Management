import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllUsers = ({url}) => {
    const [allUserList , setAllUserList] = useState([])

    const fetchAllUsers = async() => {
        const response = await axios.get(`${url}/api/user/all-user`)
        console.log(response.data)
        if (response.data.success) {
            setAllUserList(response.data.data)
        }else{
            toast.error('err')
        }
    }

    useEffect(() => {
        fetchAllUsers()
    },[])

  return (
    <>
        <div className='ml-60'>
            <h1>All users</h1>
            <div>
                {
                    allUserList.map((user,index) => {
                        return (
                            <div key={index} className='pt-5 pb-5'>
                                <p>{user.name}</p>
                                {
                                    Array.isArray(user.cartData) ? (
                                        <div>
                                            <h6>Cart items</h6>
                                            {
                                                user.cartData.map((item , idx) => (
                                                    <div>
                                                        <p>Item Name: {item.name}</p>
                                                        <p>Quantity: {item.quantity}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <p>Cart data is not available or not an array</p>
                                    )
                                }
                                <p>{user.email}</p>
                                <p>{user.createdAt}</p>
                                <hr/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default AllUsers