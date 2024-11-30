import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ProfilePage = () => {
  const { url, token } = useContext(StoreContext)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(url+'/api/user/info-user', { headers: { token } })
      if (response.data.success) {
        setProfile(response.data.data)
      } else {
        toast.error('Failed to load profile')
      }
    } catch (err) {
      toast.error('Error fetching user details')
    } finally {
      setLoading(false) 
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [url, token]) // Refetch the user details if the URL or token changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-500">Loading...</div> 
      </div>
    )
  }

  return (
    <div className="pt-32 px-4 sm:px-8 lg:px-16">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Profile Page</h1>

      {/* Profile Card */}
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto space-y-6">
        {/* Profile Picture (Placeholder if not available) */}
        <div className="flex justify-center">
          <img src={'https://via.placeholder.com/150'} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-green-500"/>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-lg font-semibold text-gray-700">Name:</p>
            <p className="text-gray-600">{profile?.name}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">Email:</p>
            <p className="text-gray-600">{profile?.email}</p>
          </div>
          {/* Add more fields if needed */}
        </div>

        {/* Orders Button */}
        <div className="flex justify-center mt-6 gap-3">
          <button onClick={() => navigate('/my-order')} className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-600 focus:outline-none">
            View Your Orders
          </button>
          <button onClick={() => navigate('/bookings')} className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-600 focus:outline-none">
            Booked Movies
          </button>
          <button onClick={() => navigate('/my-order')} className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-600 focus:outline-none">
            see your Fitness Class
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
