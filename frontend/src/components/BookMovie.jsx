// import React, { useContext } from 'react'
// import { StoreContext } from '../context/StoreContext'

// const BookMovie = () => {
//   const {selectedMovie, selectedShowtime, selectedSeats} = useContext(StoreContext)
//   const totalSeats = selectedSeats.length;
//   const ticketPrice = selectedMovie ? selectedMovie.price : 0;
//   const totalAmount = totalSeats * ticketPrice;

//   return (
//     < >
//         <div className='pt-48'>
//             <h1>Book movie</h1>
//             {selectedMovie && (
//         <>
//           <h2>Movie: {selectedMovie.name}</h2>
//           <h3>Showtime: {selectedShowtime}</h3>
//           <h4>Seats Selected: {selectedSeats.join(', ')}</h4>
//           <h4>Number of Seats: {totalSeats}</h4>
//           <h4>Total Amount: ${totalAmount}</h4>
//         </>
//       )}
//       <button>Make a payment</button>
//         </div>
//     </>
//   )
// }

// export default BookMovie

import React from 'react'

const BookMovie = () => {
  return (
    <div>BookMovie</div>
  )
}

export default BookMovie