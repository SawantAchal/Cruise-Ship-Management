import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AllMovieBookings = ({url}) => {
    const [allMovieBookings , setAllMovieBookings] = useState([])

    const fetchAllMoviesBooked = async () => {
        const res = await axios.get(url+'/api/bookedMovie/allusers-MoviedMovies')
        if (res.data.success) {
            setAllMovieBookings(res.data.data)
            console.log(res.data.data)
        }else{
            toast.error('error')
        }
    }

    useEffect(() => {
        fetchAllMoviesBooked()
    },[])

  return (
    <div>
        {
            allMovieBookings.map((movie , index) =>{
                return (
                    <div className='ml-48' key={index}>
                        <p>{movie.createdAt}</p>
                        <p>{movie.total_amount}</p>
                        <p>{movie.showtime}</p>
                        <p>{movie.seats}</p>
                        <hr/>
                    </div>
                )
            })
        }
    </div>
  )
}

export default AllMovieBookings