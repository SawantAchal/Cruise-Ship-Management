import React, { useState, useEffect } from 'react';
import { fetchEquipment, createEquipment, deleteEquipment } from '../utils/api';

const EquipmentManagement = ({ fitnessCenterId }) => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [newEquipment, setNewEquipment] = useState('');

  useEffect(() => {
    if (fitnessCenterId) {
      fetchEquipment(fitnessCenterId)
        .then((res) => setEquipmentList(res.data))
        .catch((err) => console.error(err));
    }
  }, [fitnessCenterId]);

  const handleAddEquipment = (e) => {
    e.preventDefault();
    createEquipment({ fitnessCenterId, name: newEquipment })
      .then(() => {
        setEquipmentList((prev) => [...prev, { name: newEquipment }]);
        setNewEquipment('');
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteEquipment = (id) => {
    deleteEquipment(id)
      .then(() => {
        setEquipmentList((prev) => prev.filter((equipment) => equipment._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='ml-14'>
      <h3>Equipment Management</h3>
      <form onSubmit={handleAddEquipment}>
        <input
          type="text"
          value={newEquipment}
          onChange={(e) => setNewEquipment(e.target.value)}
          placeholder="Add new equipment"
          required
        />
        <button type="submit">Add Equipment</button>
      </form>
      <ul>
        {equipmentList.map((equipment) => (
          <li key={equipment._id}>
            {equipment.name}
            <button onClick={() => handleDeleteEquipment(equipment._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentManagement;
