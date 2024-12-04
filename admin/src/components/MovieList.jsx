// import React from 'react';
// import axios from 'axios';

// const MovieList = ({ movies, fetchMovies, setEditingMovie , url }) => {
    
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this movie?')) return;
//     try {
//       await axios.delete(`${url}/api/movies/${id}`);
//       fetchMovies();
//     } catch (error) {
//       console.error('Error deleting movie:', error);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {movies.map((movie) => (
//         <div key={movie._id} className="p-4 bg-gray-100 shadow rounded">
//           <h3 className="font-bold">{movie.title}</h3>
//           <p>{movie.description}</p>
//           <p><strong>Language:</strong> {movie.language}</p>
//           <p><strong>Seats:</strong> {JSON.stringify(movie.availableSeats)}</p>
//           <p><strong>Price:</strong> ${movie.pricePerSeat}</p>
//           <p><strong>Rating:</strong> {movie.rating}</p>
//           <button
//             onClick={() => setEditingMovie(movie)}
//             className="mt-2 bg-yellow-500 text-white px-2 py-1 rounded"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDelete(movie._id)}
//             className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MovieList;




import React from 'react';
import axios from 'axios';

const MovieList = ({ movies, fetchMovies, setEditingMovie, url }) => {

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      await axios.delete(`${url}/api/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {movies.map((movie) => (
        <div key={movie._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{movie.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{movie.description}</p>
          
          <div className="mb-2">
            <p><span className="font-medium text-gray-700">Language:</span> {movie.language}</p>
            <p><span className="font-medium text-gray-700">Seats:</span> {JSON.stringify(movie.availableSeats)}</p>
            <p><span className="font-medium text-gray-700">Price:</span> ${movie.pricePerSeat}</p>
            <p><span className="font-medium text-gray-700">Rating:</span> {movie.rating}</p>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setEditingMovie(movie)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(movie._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
