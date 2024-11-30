import React, { useState, useEffect } from 'react';
import { fetchFitnessCenters } from '../utils/api';

const FitnessCenterList = ({ onCenterClick }) => {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    console.log("Fitness centers");
    
    fetchFitnessCenters()
      .then((res) => setCenters(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='ml-14'>
      <h2>Fitness Centers</h2>
      <ul>
        {centers.map((center) => (
          <li key={center._id} onClick={() => onCenterClick(center._id)}>
            {center.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessCenterList;
