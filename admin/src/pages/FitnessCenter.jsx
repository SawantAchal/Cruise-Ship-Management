import React, { useState, useEffect } from 'react';
import FitnessCenterForm from '../components/FitnessCenterForm';
import FitnessCenterList from '../components/FitnessCenterList';
import { fetchFitnessCenters } from '../utils/api';

const FitnessCenter = () => {
  const [centers, setCenters] = useState([]);

  // Function to refresh the list of fitness centers
  const refreshCenters = () => {
    fetchFitnessCenters()
      .then((res) => setCenters(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    refreshCenters(); // Load fitness centers on component mount
  }, []);

  return (
    <div>
      <FitnessCenterForm refreshCenters={refreshCenters} />
      <FitnessCenterList centers={centers} />
    </div>
  );
};

export default FitnessCenter;
