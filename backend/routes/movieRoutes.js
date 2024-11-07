import express from 'express'
import { addmovie, allMovieList, removeMovie } from '../controllers/movieController.js';

const movieRouter = express.Router();

movieRouter.post('/add-movie' ,addmovie)
movieRouter.get('/all-movie', allMovieList)
movieRouter.post('/remove-movie' , removeMovie)

export default movieRouter;
