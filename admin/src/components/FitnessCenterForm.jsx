// import React, { useState } from 'react';
// import { createFitnessCenter, updateFitnessCenter } from '../utils/api';

// const FitnessCenterForm = ({ center, refreshCenters }) => {
//   const [formData, setFormData] = useState(center || { name: '', type: '', description: '' });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const action = center ? updateFitnessCenter(center._id, formData) : createFitnessCenter(formData);
//     action
//       .then(() => refreshCenters())
//       .catch((err) => console.error(err));
//   };

//   return (
//     <form onSubmit={handleSubmit} className='ml-14'>
//       <input
//         type="text"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         placeholder="Name"
//         required
//       />
//       <input
//         type="text"
//         value={formData.type}
//         onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//         placeholder="Type"
//         required
//       />
//       <textarea
//         value={formData.description}
//         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         placeholder="Description"
//       />
//       <button type="submit">{center ? 'Update' : 'Create'}</button>
//     </form>
//   );
// };

// export default FitnessCenterForm;



import React, { useState } from 'react';
import { createFitnessCenter, updateFitnessCenter } from '../utils/api';

const FitnessCenterForm = ({ center, refreshCenters }) => {
  const [formData, setFormData] = useState(center || { name: '', type: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = center ? updateFitnessCenter(center._id, formData) : createFitnessCenter(formData);
    action
      .then(() => refreshCenters())
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg ml-32">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">{center ? 'Update' : 'Create'} Fitness Center</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Fitness Center Name"
            required
            className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-600">Type</label>
          <input
            id="type"
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            placeholder="Fitness Center Type"
            required
            className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the fitness center"
            className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {center ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default FitnessCenterForm;
