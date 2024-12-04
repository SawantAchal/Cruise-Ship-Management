// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MovieList from '../components/MovieList';
// import MovieForm from '../components/MovieForm';

// const MovieManagement = ({url}) => {
//   const [movies, setMovies] = useState([]);
//   const [editingMovie, setEditingMovie] = useState(null);

//   const fetchMovies = async () => {
//     try {
//       const response = await axios.get(`${url}/api/movies`);
//       setMovies(response.data);
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Manage Movies</h1>
//       <MovieForm fetchMovies={fetchMovies} editingMovie={editingMovie} setEditingMovie={setEditingMovie} url={url}/>
//       <div className="mt-4">
//         <MovieList movies={movies} fetchMovies={fetchMovies} setEditingMovie={setEditingMovie} url={url}/>
//       </div>
//     </div>
//   );
// };

// export default MovieManagement;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import MovieForm from '../components/MovieForm';

const MovieManagement = ({ url }) => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch movies from the server
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 ml-10">Manage Movies</h1>

      {/* Movie Form */}
      <MovieForm
        fetchMovies={fetchMovies}
        editingMovie={editingMovie}
        setEditingMovie={setEditingMovie}
        url={url}
      />

      <div className="mt-8">
        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* Movie List */}
        {!loading && movies.length === 0 && (
          <div className="text-center text-gray-600">
            <p>No movies found. Add some movies to get started!</p>
          </div>
        )}
        {!loading && movies.length > 0 && (
          <MovieList
            movies={movies}
            fetchMovies={fetchMovies}
            setEditingMovie={setEditingMovie}
            url={url}
          />
        )}
      </div>
    </div>
  );
};

export default MovieManagement;
