import mongoose from "mongoose"

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

const showtimeSchema = new mongoose.Schema({
  time: { type: String, required: true },
  seats: [seatSchema],
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  pricePerSeat: { type: Number, required: true },
  rating: { type: Number, required: true },
  showtimes: [showtimeSchema],
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
export default Movie;
