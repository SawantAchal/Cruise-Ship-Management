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
  console.log(timeSlots);
  
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
    <div className='ml-14'>
      <h3>Time Slot Management</h3>
      <form onSubmit={handleAddTimeSlot}>
        <input
          type="time"
          value={newTimeSlot.startTime}
          onChange={(e) => setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })}
          required
        />
        <input
          type="time"
          value={newTimeSlot.endTime}
          onChange={(e) => setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })}
          required
        />
        <button type="submit">Add Time Slot</button>
      </form>
      <ul>
        {timeSlots.map((slot) => (
          <li key={slot._id}>
            {slot.startTime} - {slot.endTime}
            <button onClick={() => handleDeleteTimeSlot(slot._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlotManagement;
