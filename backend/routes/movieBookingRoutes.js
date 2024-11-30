import express from 'express';
import { bookMovie, deleteBooking, getAllBookings, getBookingById, updateBookingStatus } from '../controllers/movieBookingController.js';


const movieBookingRoutes = express.Router();

movieBookingRoutes.post('/', bookMovie);
movieBookingRoutes.get('/', getAllBookings);
movieBookingRoutes.get('/:id', getBookingById);
movieBookingRoutes.delete('/:id', deleteBooking);
movieBookingRoutes.put('/:id', updateBookingStatus);

export default movieBookingRoutes;
