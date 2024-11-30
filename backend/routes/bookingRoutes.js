import express from 'express'
import { createBooking, getBookingsByFitnessCenter, getBookingsByUser } from '../controllers/bookingController.js';


const bookingRoute = express.Router();

bookingRoute.get('/user/:userId'  ,getBookingsByUser)
bookingRoute.post('/createBooking'  ,createBooking)
bookingRoute.get('/fitness-center/:fitnessCenterId'  ,getBookingsByFitnessCenter)


export default bookingRoute;