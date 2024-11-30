import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';

const MovieListPage = () => {
    const {url}=useContext(StoreContext)
    const [movies, setMovies] = useState([]);

  
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${url}/api/movies`);
        setMovies(response.data);
      } catch (error) {
        toast.error('Error fetching movies:', error);
      }
    };
  
    useEffect(() => {
      fetchMovies();
    }, []);
  
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Available Movies</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  </div>
  )
}

export default MovieListPage