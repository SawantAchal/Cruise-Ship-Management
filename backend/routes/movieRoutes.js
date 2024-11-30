import express from 'express';
import { addMovie , getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    getShowtimeSeats, } from '../controllers/movieController.js';


const MovieRoutes = express.Router();

MovieRoutes.post('/', addMovie);
MovieRoutes.get('/', getAllMovies);
MovieRoutes.get('/:id/seats', getShowtimeSeats)
MovieRoutes.get('/:id', getMovieById);
MovieRoutes.put('/:id', updateMovie);
MovieRoutes.delete('/:id', deleteMovie);
MovieRoutes.post('/test', (req, res) => {
    res.status(200).json({ message: 'Test route works!' });
  });
  

export default MovieRoutes;
