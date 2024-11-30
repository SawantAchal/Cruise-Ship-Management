import Movie from '../model/movieModel.js';

const generateSeatMap = (rows, cols) => {
    const seats = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        seats.push({ seatNumber: `${String.fromCharCode(65 + row)}${col + 1}`, isBooked: false });
      }
    }
    return seats;
  };
  
  // Add or update movie
  export const addMovie = async (req, res) => {
    try {
      const { title, description, language, pricePerSeat, rating, rows, cols, showtimes } = req.body;
      const movie = new Movie({
        title,
        description,
        language,
        pricePerSeat,
        rating,
        showtimes: showtimes.map((time) => ({
          time,
          seats: generateSeatMap(rows, cols),
        })),
      });
      const savedMovie = await movie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getShowtimeSeats = async (req, res) => {
    const { id } = req.params;
    const { time } = req.query;
  
    try {
      const movie = await Movie.findById(id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
  
      const showtime = movie.showtimes.find((st) => st.time === time);
      if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
  
      res.status(200).json(showtime.seats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  


// Get all movies
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single movie
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a movie
export const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a movie
export const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
