import Booking from '../model/movieBookingModel.js';
import Movie from '../model/movieModel.js';
import userModel from '../model/userModel.js';

// Book a movie
export const bookMovie = async (req, res) => {
    const { movieId, user, showtime, selectedSeats, paymentStatus } = req.body;
  
    try {
      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
  
      const showtimeObj = movie.showtimes.find((st) => st.time === showtime);
      if (!showtimeObj) return res.status(404).json({ message: 'Showtime not found' });
  
      // Check if seats are available
      const unavailableSeats = selectedSeats.filter((seat) =>
        showtimeObj.seats.find((s) => s.seatNumber === seat && s.isBooked)
      );
      if (unavailableSeats.length > 0) {
        return res.status(400).json({ message: `Seats already booked: ${unavailableSeats.join(', ')}` });
      }
  
      // Mark selected seats as booked
      showtimeObj.seats.forEach((seat) => {
        if (selectedSeats.includes(seat.seatNumber)) {
          seat.isBooked = true;
        }
      });
  
      const totalAmount = selectedSeats.length * movie.pricePerSeat;
  
      // Save the booking
      const booking = new Booking({
        movie: movieId,
        user,
        showtime,
        seats: selectedSeats.length,
        totalAmount,
        paymentStatus,
      });
      await booking.save();
      await movie.save();

    //   // Update user's bookedMovies field
    // const userDoc = await userModel.findOne({ email: user }); // Assuming `user` is an email
    // if (!userDoc) return res.status(404).json({ message: 'User not found' });

    // if (!userDoc.bookedMovies[movieId]) {
    //   userDoc.bookedMovies[movieId] = [];
    // }
    // userDoc.bookedMovies[movieId].push({
    //   showtime,
    //   seats: selectedSeats,
    //   totalAmount,
    //   bookingId: booking._id,
    // });
    // await userDoc.save();
  
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const updateBookingStatus = async (req, res) => {
    const { id } = req.params; // Get the booking ID from the request params
    const { paymentStatus } = req.body; // Get the new status from the request body
    console.log("pay,en", paymentStatus);
    

    try {
        // Find the booking by ID and update the paymentStatus field
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { paymentStatus }, // Only update the paymentStatus field
            { new: true } // Return the updated document
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(updatedBooking); // Return the updated booking
        console.log("updatedBooking", updatedBooking);
        
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ message: 'Error updating booking status' });
    }
};
  

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('movie');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('movie');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const movie = await Movie.findById(booking.movie);
        if (movie) {
            movie.availableSeats += booking.seats;
            await movie.save();
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
