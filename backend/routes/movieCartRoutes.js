import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { addMovietoUser, getFromMovieCart, removeFromMovieCart } from '../controllers/movieCartController.js';

const movieCartRouter = express.Router();

movieCartRouter.post('/addToMovieCart' ,authMiddleware, addMovietoUser)
movieCartRouter.post('/removeFromMovieCart' ,authMiddleware, removeFromMovieCart)
movieCartRouter.post('/getMovieCart' ,authMiddleware, getFromMovieCart)

export default movieCartRouter;