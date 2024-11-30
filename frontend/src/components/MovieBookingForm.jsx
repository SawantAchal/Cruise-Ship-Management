import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SeatMap from '../components/MovieSeatMap';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';

const MovieBookingForm = ({ movie }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(movie || null); // Pre-select movie from props
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const { token , url } = useContext(StoreContext);

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


  const handleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber)
        : [...prevSeats, seatNumber]
    );
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/bookings`, {
        movieId: selectedMovie._id,
        user: token,
        showtime: selectedShowtime,
        selectedSeats: selectedSeats,
        paymentStatus: "Pending",
      });
      toast.success('Booking successful!');
      setSelectedSeats([]);
      navigate('/bookings');
    } catch (error) {
      toast.error('Error booking seats:', error.message);
    }
  };

  return (
    <div>
    <form className="p-4 bg-white shadow-md rounded" onSubmit={handleBooking}>
      <div>
        <h2>Select a Movie</h2>
        {selectedMovie ? (
          <div className="p-2 m-2 bg-blue-500">
            {selectedMovie.title} (Selected)
          </div>
        ) : (
          movies.map((movie) => (
            <button key={movie._id} onClick={() => setSelectedMovie(movie)} type="button" className="p-2 m-2 bg-gray-300">
              {movie.title}
            </button>
          ))
        )}
      </div>

      {selectedMovie && (
        <div>
          <h2>Select a Showtime</h2>
          {selectedMovie.showtimes.map((showtime) => (
            <button key={showtime.time} type="button" onClick={() => setSelectedShowtime(showtime.time)} className={`p-2 m-2 ${ selectedShowtime === showtime.time ? 'bg-green-500' : 'bg-gray-300' }`}>
              {showtime.time}
            </button>
          ))}
        </div>
      )}

      {selectedShowtime && (
        <div>
          <h2>Select Your Seats</h2>
          <SeatMap movieId={selectedMovie._id} showtime={selectedShowtime} selectedSeats={selectedSeats} onSeatSelect={handleSeatSelection}/>
        </div>
      )}

      {selectedSeats.length > 0 && (
        <div>
          <h2>Selected Seats: {selectedSeats.join(', ')}</h2>
          <button type="submit" className="p-2 bg-blue-500">
            Confirm Booking
          </button>
        </div>
      )}
    </form>
  </div>
  )
}

export default MovieBookingForm