import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({movie}) => {
    const navigate = useNavigate()
  return (
    <>
        <div className='flex flex-row border border-black gap-3'>
            <h1>{movie.name}</h1>
            <p>Price: ${movie.price}</p>
            <p>Duration: {movie.duration}</p>
            <div>
                <h3>Showtimes:</h3>
                {
                    Array.isArray(movie.showtimes) && movie.showtimes.length > 0 ? (
                        movie.showtimes.map((time , index) => (
                            <div key={index}>
                                <p>{time}</p>
                                <button onClick={() => navigate('/seat-selection')}>Book Now</button>
                            </div>
                        ))
                    ):(
                        <p>No show time available</p>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default MovieCard