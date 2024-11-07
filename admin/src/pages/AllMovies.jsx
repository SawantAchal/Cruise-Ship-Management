import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AllMovies = ({url}) => {
  const [allMovies , setAllMovies] = useState([]);

  const fetchAllMovies = async () => {
    try {
      const response = await axios.get(`${url}/api/movie/all-movie`);
      console.log('All movies: ', response.data);
      if (response.data.success) {
        setAllMovies(response.data.data);
      } else {
        toast.error('Error fetching moive .');
      }
    } catch (error) {
      toast.error('An error occurred while fetching movie .');
      console.error(error);
    }
  }

  const removeMovie = async (movieId) => {
    try {
      const response = await axios.post(`${url}/api/movie/remove-movie`, { id: movieId });
      if (response.data.success) {
        await fetchAllMovies()
        toast.success(' movie removed successfully.');
      } else {
        toast.error('Error removing movie .');
      }
    } catch (error) {
      toast.error('An error occurred while removing the movie .');
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllMovies();
}, []);

  return (
    <div className='ml-36'>
      {
        allMovies.map((movie , index) =>{
          return(
            <>
              <div>{movie.name}</div>
              <div>{movie.description}</div>
              <div>{movie.language}</div>
              <div>{movie.rating}</div>
              <div>{movie.showtimes}</div>
              <div>{movie.ticket_price}</div>
              <div onClick={() => removeMovie(movie._id)}>X</div>
              <hr/>
            </>
            
          )
        })
      }
    </div>
  )
}

export default AllMovies