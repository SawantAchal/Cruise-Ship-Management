// import React from 'react';
// import axios from 'axios';

// const BookingList = ({ bookings, fetchBookings, url }) => {
//   // Function to handle booking deletion
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this booking?')) return;
//     try {
//       await axios.delete(`${url}/api/bookings/${id}`);
//       fetchBookings(); // Refresh the bookings list after deletion
//     } catch (error) {
//       console.error('Error deleting booking:', error);
//     }
//   };

//   // Function to handle payment status change
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.put(`${url}/api/bookings/${id}`, {
//         paymentStatus: newStatus, // Update payment status
//       });
//       fetchBookings(); // Refresh the bookings list after status change
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   return (
//     <div className="overflow-x-auto px-4 py-6 sm:px-6 lg:px-8">
//       <table className="min-w-full table-auto border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100 text-gray-700">
//             <th className="border border-gray-300 px-4 py-2 text-left">Movie</th>
//             <th className="border border-gray-300 px-4 py-2 text-left">Showtime</th>
//             <th className="border border-gray-300 px-4 py-2 text-left">Seats</th>
//             <th className="border border-gray-300 px-4 py-2 text-left">Total Amount</th>
//             <th className="border border-gray-300 px-4 py-2 text-left">Payment Status</th>
//             <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking) => (
//             <tr key={booking._id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-4 py-2">{booking.movie?.title || 'N/A'}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.showtime}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {Array.isArray(booking.seats) ? booking.seats.join(', ') : booking.seats}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">${booking.totalAmount}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <span
//                   className={`${
//                     booking.paymentStatus === 'Completed' ? 'text-green-500' : 'text-yellow-500'
//                   } font-semibold`}
//                 >
//                   {booking.paymentStatus}
//                 </span>
//               </td>
//               <td className="border border-gray-300 px-4 py-2 space-x-2">
//                 {booking.paymentStatus === 'Pending' && (
//                   <button
//                     onClick={() => handleStatusChange(booking._id, 'Completed')}
//                     className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-200"
//                   >
//                     Mark as Completed
//                   </button>
//                 )}
//                 <button
//                   onClick={() => handleDelete(booking._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookingList;



import React from 'react';
import axios from 'axios';

const BookingList = ({ bookings, fetchBookings, url, loading }) => {
  // Handle booking deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`${url}/api/bookings/${id}`);
      fetchBookings(); // Refresh the bookings list
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking.');
    }
  };

  // Handle changing the payment status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${url}/api/bookings/${id}`, { paymentStatus: newStatus });
      fetchBookings(); // Refresh after status update
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update payment status.');
    }
  };

  return (
    <div className="overflow-x-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border border-gray-300 px-4 py-2 text-left">Movie</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Showtime</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Seats</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Payment Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{booking.movie?.title || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.showtime}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {Array.isArray(booking.seats) ? booking.seats.join(', ') : booking.seats}
                </td>
                <td className="border border-gray-300 px-4 py-2">${booking.totalAmount}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`${
                      booking.paymentStatus === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                    } font-semibold`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  {booking.paymentStatus === 'Pending' && (
                    <button
                      onClick={() => handleStatusChange(booking._id, 'Completed')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-200"
                    >
                      Mark as Completed
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
