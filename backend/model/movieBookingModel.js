import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  user: { type: String, required: true },
  showtime: { type: String, required: true },
  seats: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

const Booking = mongoose.models.MovieBooking || mongoose.model('MovieBooking', bookingSchema);
export default Booking;
