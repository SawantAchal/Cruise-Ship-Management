import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';

const MovieSeatMap = ({ movieId, showtime, selectedSeats, onSeatSelect }) => {
    const [seats, setSeats] = useState([]);
    const {url} = useContext(StoreContext)

    const fetchSeats = async () => {
      try {
        const response = await axios.get( `${url}/api/movies/${movieId}/seats?time=${showtime}`);
        setSeats(response.data);
      } catch (error) {
        toast.error('Error fetching seats:', error);
      }
    };

  useEffect(() => {
    fetchSeats();
  }, [movieId, showtime]);
    
  const handleSeatClick = (e, seat) => {
    e.preventDefault(); 
    if (!seat.isBooked) {
      onSeatSelect(seat.seatNumber);
    }
  };
  return (
    <div className="grid grid-cols-10 gap-2">
    {seats.map((seat) => (
      <button key={seat.seatNumber} onClick={(e) => handleSeatClick(e, seat)} disabled={seat.isBooked} className={`p-2 ${
          seat.isBooked
            ? 'bg-red-500'
            : selectedSeats.includes(seat.seatNumber)
            ? 'bg-yellow-500' // Highlight selected seats
            : 'bg-green-500'
        }`}
      >
        {seat.seatNumber}
      </button>
    ))}
  </div>
  )
}

export default MovieSeatMap