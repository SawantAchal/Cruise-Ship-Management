// import React, { useState, useEffect } from 'react';
// import { fetchTimeSlots, createTimeSlot, deleteTimeSlot } from '../utils/api';

// const TimeSlotManagement = ({ fitnessCenterId }) => {
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [newTimeSlot, setNewTimeSlot] = useState({ startTime: '', endTime: '' });
  
//   useEffect(() => {
//     if (fitnessCenterId) {
//       fetchTimeSlots(fitnessCenterId)
//         .then((res) => setTimeSlots(res.data))
//         .catch((err) => console.error(err));
//     }
//   }, [fitnessCenterId]);
//   console.log(timeSlots);
  
//   const handleAddTimeSlot = (e) => {
//     e.preventDefault();
//     createTimeSlot({ fitnessCenterId, ...newTimeSlot })
//       .then(() => {
//         setTimeSlots((prev) => [...prev, newTimeSlot]);
//         setNewTimeSlot({ startTime: '', endTime: '' });
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleDeleteTimeSlot = (id) => {
//     deleteTimeSlot(id)
//       .then(() => {
//         setTimeSlots((prev) => prev.filter((slot) => slot._id !== id));
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className='ml-14'>
//       <h3>Time Slot Management</h3>
//       <form onSubmit={handleAddTimeSlot}>
//         <input
//           type="time"
//           value={newTimeSlot.startTime}
//           onChange={(e) => setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })}
//           required
//         />
//         <input
//           type="time"
//           value={newTimeSlot.endTime}
//           onChange={(e) => setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })}
//           required
//         />
//         <button type="submit">Add Time Slot</button>
//       </form>
//       <ul>
//         {timeSlots.map((slot) => (
//           <li key={slot._id}>
//             {slot.startTime} - {slot.endTime}
//             <button onClick={() => handleDeleteTimeSlot(slot._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TimeSlotManagement;

import React, { useState, useEffect } from 'react';
import { fetchTimeSlots, createTimeSlot, deleteTimeSlot } from '../utils/api';

const TimeSlotManagement = ({ fitnessCenterId }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [newTimeSlot, setNewTimeSlot] = useState({ startTime: '', endTime: '' });
  
  useEffect(() => {
    if (fitnessCenterId) {
      fetchTimeSlots(fitnessCenterId)
        .then((res) => setTimeSlots(res.data))
        .catch((err) => console.error(err));
    }
  }, [fitnessCenterId]);

  const handleAddTimeSlot = (e) => {
    e.preventDefault();
    createTimeSlot({ fitnessCenterId, ...newTimeSlot })
      .then(() => {
        setTimeSlots((prev) => [...prev, newTimeSlot]);
        setNewTimeSlot({ startTime: '', endTime: '' });
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteTimeSlot = (id) => {
    deleteTimeSlot(id)
      .then(() => {
        setTimeSlots((prev) => prev.filter((slot) => slot._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg ml-32">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Time Slot Management</h3>
      
      <form onSubmit={handleAddTimeSlot} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-600">Start Time</label>
            <input
              id="start-time"
              type="time"
              value={newTimeSlot.startTime}
              onChange={(e) => setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })}
              required
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="end-time" className="block text-sm font-medium text-gray-600">End Time</label>
            <input
              id="end-time"
              type="time"
              value={newTimeSlot.endTime}
              onChange={(e) => setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })}
              required
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Add Time Slot
        </button>
      </form>
      
      <ul className="mt-8 space-y-4">
        {timeSlots.map((slot) => (
          <li key={slot._id} className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-colors">
            <span className="text-lg font-medium text-gray-700">
              {slot.startTime} - {slot.endTime}
            </span>
            <button
              onClick={() => handleDeleteTimeSlot(slot._id)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlotManagement;
