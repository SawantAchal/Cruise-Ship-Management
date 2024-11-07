// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { StoreContext } from '../context/StoreContext'

// const MovieCard = ({movie}) => {
//     const navigate = useNavigate()
//     const {setSelectedMovie, setSelectedShowtime,setTicketPrice} = useContext(StoreContext)
//     const handleSelect = (showtime) => {
//         setSelectedMovie(movie);
//         setSelectedShowtime(showtime); // Set the selected showtime here
//         setTicketPrice(movie.ticket_price); 
//         navigate('/seat-selection');
//       };

//   return (
//     <>
//         <div className='flex flex-row border border-black gap-3'>
//             <h1>{movie.name}</h1>
//             <p>Price: ${movie.price}</p>
//             <p>Duration: {movie.duration}</p>
//             <div>
//                 <h3>Showtimes:</h3>
//                 {
//                     Array.isArray(movie.showtimes) && movie.showtimes.length > 0 ? (
//                         movie.showtimes.map((time , index) => (
//                             <div key={index}>
//                                 <p>{time}</p>
//                                 <button onClick={handleSelect(time)}>Book Now</button>
//                             </div>
//                         ))
//                     ):(
//                         <p>No show time available</p>
//                     )
//                 }
//             </div>
//         </div>

//     </>
//   )
// }

// export default MovieCard

import React from 'react'

const MovieCard = () => {
  return (
    <div>MovieCard</div>
  )
}

export default MovieCard