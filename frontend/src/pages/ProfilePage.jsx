import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const ProfilePage = () => {
  const {url , token} = useContext(StoreContext)
  const [profile , setProfile] = useState([])  
  const navigate = useNavigate()

  const fetchUserDetails = async () => {
    const response = await axios.get(url + '/api/user/info-user' ,{headers:{token}})
    // console.log('user prfile' , response.data)
    if (response.data.success) {
      setProfile(response.data.data)
    } else {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchUserDetails()
  },[url])

  return (
    <div className='pt-48'>
      <h1>Profile Page</h1>
      <div>
        {Array.isArray(profile) ? (
          profile.map((user, index) => (
            <div key={index}>
              <p>{user.name}</p>
            </div>
          ))
        ) : (
          <div>
            <p>Name: {profile?.name}</p>
            <p>Email: {profile?.email}</p>
            {/* Display other fields as needed */}
          </div>
        )}
      </div>
      <div onClick={() => navigate('/my-order')} className='cursor-pointer text-3xl'>
        Your Orders
      </div>
    </div>
  )
}

export default ProfilePage