// import React, { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { StoreContext } from '../context/StoreContext';

// const SeatSelection = () => {
//     const totalSeats = 50; // Total number of seats
//     const [selectedSeats, setSelectedSeats] = useState([]); // Array to store selected seat numbers
//     const navigate = useNavigate()
//     const { setSelectedSeats: setSeatsInContext } = useContext(StoreContext)

//     // Function to handle seat selection
//     const handleSeatClick = (seatNumber) => {
//       if (selectedSeats.includes(seatNumber)) {
//         // If the seat is already selected, remove it from the selection
//         setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
//       } else {
//         // If the seat is not selected, add it to the selection
//         setSelectedSeats([...selectedSeats, seatNumber]);
//       }
//     };

//     const handleProceed = (e) => {
//       event.preventDefault();
//       setSeatsInContext(selectedSeats);
//       navigate('/book-movie');
//     };

//   return (
//     <>
//         <div className="pt-56">
//       <h2>Select Your Seats</h2>
//       <div className="seats-container">
//         {Array.from({ length: totalSeats }, (_, index) => {
//           const seatNumber = index + 1; // Seat numbers start from 1
//           const isSelected = selectedSeats.includes(seatNumber); // Check if the seat is selected

//           return (
//             <div
//               key={seatNumber}
//               className={`seat ${isSelected ? 'selected' : ''}`}
//               onClick={() => handleSeatClick(seatNumber)}
//               style={{
//                 backgroundColor: isSelected ? 'red' : 'lightgray',
//                 width: '40px',
//                 height: '40px',
//                 margin: '5px',
//                 display: 'inline-block',
//                 cursor: 'pointer',
//                 textAlign: 'center',
//                 lineHeight: '40px',
//                 borderRadius: '5px',
//                 border: '1px solid #000',
//               }}
//             >
//               {seatNumber}
//             </div>
//           );
//         })}
//       </div>
//       <div>
//         <h3>Selected Seats: {selectedSeats.join(', ')}</h3>
//         <button onClick={handleProceed}>Procced to payment</button>
//       </div>
//     </div>
//     </>
//   )
// }

// export default SeatSelection

import React from 'react'

const SeatSelection = () => {
  return (
    <div>SeatSelection</div>
  )
}

export default SeatSelection