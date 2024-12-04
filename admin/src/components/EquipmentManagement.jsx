// import React, { useState, useEffect } from 'react';
// import { fetchEquipment, createEquipment, deleteEquipment } from '../utils/api';

// const EquipmentManagement = ({ fitnessCenterId }) => {
//   const [equipmentList, setEquipmentList] = useState([]);
//   const [newEquipment, setNewEquipment] = useState('');

//   useEffect(() => {
//     if (fitnessCenterId) {
//       fetchEquipment(fitnessCenterId)
//         .then((res) => setEquipmentList(res.data))
//         .catch((err) => console.error(err));
//     }
//   }, [fitnessCenterId]);

//   const handleAddEquipment = (e) => {
//     e.preventDefault();
//     createEquipment({ fitnessCenterId, name: newEquipment })
//       .then(() => {
//         setEquipmentList((prev) => [...prev, { name: newEquipment }]);
//         setNewEquipment('');
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleDeleteEquipment = (id) => {
//     deleteEquipment(id)
//       .then(() => {
//         setEquipmentList((prev) => prev.filter((equipment) => equipment._id !== id));
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className='ml-14'>
//       <h3>Equipment Management</h3>
//       <form onSubmit={handleAddEquipment}>
//         <input
//           type="text"
//           value={newEquipment}
//           onChange={(e) => setNewEquipment(e.target.value)}
//           placeholder="Add new equipment"
//           required
//         />
//         <button type="submit">Add Equipment</button>
//       </form>
//       <ul>
//         {equipmentList.map((equipment) => (
//           <li key={equipment._id}>
//             {equipment.name}
//             <button onClick={() => handleDeleteEquipment(equipment._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default EquipmentManagement;

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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg ml-32">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Equipment Management</h3>

      <form onSubmit={handleAddEquipment} className="space-y-4">
        <div>
          <label htmlFor="equipment" className="block text-sm font-medium text-gray-600">Equipment Name</label>
          <input
            id="equipment"
            type="text"
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            placeholder="Add new equipment"
            required
            className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Add Equipment
        </button>
      </form>

      <ul className="mt-8 space-y-4">
        {equipmentList.map((equipment) => (
          <li key={equipment._id} className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-colors">
            <span className="text-lg font-medium text-gray-700">{equipment.name}</span>
            <button
              onClick={() => handleDeleteEquipment(equipment._id)}
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

export default EquipmentManagement;
