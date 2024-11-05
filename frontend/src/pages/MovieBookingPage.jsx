import React from 'react'
import MovieCard from '../components/MovieCard';

const MovieBookingPage = () => {
  const movies = [
    {
      id: 1,
      name: "Movie Title 1",
      price: 10,
      duration: "2h 15m",
      showtimes: ["6:00 PM", "9:00 PM"],
    },
    {
      id: 2,
      name: "Movie Title 2",
      price: 12,
      duration: "1h 45m",
      showtimes: ["7:30 PM", "10:30 PM"],
    },
  ];
  return (
    <>
      <div>
        <h1>MovieBookingPage</h1>
        <div>
          {
            movies.map(movie => (
              <MovieCard key={movie.id} movie={movie}/>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default MovieBookingPage