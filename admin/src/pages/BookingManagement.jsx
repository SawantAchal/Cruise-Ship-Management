import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingList from '../components/BookingList';

const BookingManagement = ({url}) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${url}/api/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
      <BookingList bookings={bookings} fetchBookings={fetchBookings} />
    </div>
  );
};

export default BookingManagement;
