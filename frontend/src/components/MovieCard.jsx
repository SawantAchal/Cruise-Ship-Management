import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="p-4 bg-white shadow rounded">
    <h3 className="font-bold text-lg">{movie.title}</h3>
    <p>{movie.description}</p>
    <p><strong>Language:</strong> {movie.language}</p>
    <p><strong>Rating:</strong> {movie.rating}</p>
    <p><strong>Price per Seat:</strong> ${movie.pricePerSeat}</p>
    <Link to={`/movies/${movie._id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
      Book Now
    </Link>
  </div>
  )
}

export default MovieCard