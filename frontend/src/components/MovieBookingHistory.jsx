import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';

const MovieBookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const {url} = useContext(StoreContext)

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${url}/api/bookings`);
        setBookings(response.data);
      } catch (error) {
        toast.error('Error fetching bookings:', error);
      }
    };

    useEffect(() => {
        fetchBookings();
      }, []);
      
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Booking History</h1>
    <div>
      {bookings.map((booking) => (
        <div key={booking._id} className="p-4 mb-2 bg-white shadow rounded">
          <h3 className="font-bold">{booking.movie?.title}</h3>
          <p><strong>Showtime:</strong> {booking.showtime}</p>
          <p><strong>Seats:</strong> {booking.seats}</p>
          <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
          <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default MovieBookingHistory