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
    <form onSubmit={handleSubmit} className='ml-14'>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        placeholder="Type"
        required
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
      />
      <button type="submit">{center ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default FitnessCenterForm;
