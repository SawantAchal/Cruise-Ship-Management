import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import MovieForm from '../components/MovieForm';

const MovieManagement = ({url}) => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${url}/api/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Movies</h1>
      <MovieForm fetchMovies={fetchMovies} editingMovie={editingMovie} setEditingMovie={setEditingMovie} url={url}/>
      <div className="mt-4">
        <MovieList movies={movies} fetchMovies={fetchMovies} setEditingMovie={setEditingMovie} url={url}/>
      </div>
    </div>
  );
};

export default MovieManagement;
