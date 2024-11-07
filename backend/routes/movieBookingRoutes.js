import express from 'express'
import { listOfUserBookedMovie, movieBooking, usersBookedMovies } from '../controllers/movieBookingController.js'
import authMiddleware from '../middleware/auth.js'

const movieBookingRouter = express.Router()

movieBookingRouter.post('/Book-movie' , authMiddleware,movieBooking )
movieBookingRouter.post('/user-bookedmovie' , authMiddleware , usersBookedMovies)
movieBookingRouter.get('/allusers-MoviedMovies' , listOfUserBookedMovie)

export default movieBookingRouter