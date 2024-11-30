import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const MovieSeatSelection = () => {
    const { selectedSeats, setSelectedSeats } = useContext(StoreContext);

    const handleSelectSeat = (seat) => {
        setSelectedSeats([...selectedSeats, seat]);
    };

  return (
    <div>
    <h2>Select Seats</h2>
    {/* Render a grid of seats for selection */}
    {[1, 2, 3, 4, 5].map(seat => (
        <button key={seat} onClick={() => handleSelectSeat(seat)}>
            Seat {seat}
        </button>
    ))}
</div>
  )
}

export default MovieSeatSelection