import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/MovieBookingForm';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { url } = useContext(StoreContext);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`${url}/api/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      toast.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
    fetchMovieDetails();
  }, [id]);
    
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600"></div>
      </div>
    );
  }
    
  if (!movie) {
    return (
      <div className="text-center text-red-500">
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{movie.title}</h1>
      <p className="text-gray-700 mb-4">{movie.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="font-semibold text-gray-600">Language:</p>
          <p className="text-gray-800">{movie.language}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600">Rating:</p>
          <p className="text-gray-800">{movie.rating}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600">Price per Seat:</p>
          <p className="text-gray-800">${movie.pricePerSeat}</p>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Tickets</h2>
      <BookingForm movie={movie} />
      <div className="mt-6 flex justify-center">
        <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"  onClick={() => console.log('Proceed to Book Tickets')}>
          Proceed to Booking
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
