// import React, { useState, useEffect } from 'react';
// import { fetchFitnessCenters } from '../utils/api';

// const FitnessCenterList = ({ onCenterClick }) => {
//   const [centers, setCenters] = useState([]);

//   useEffect(() => {
//     console.log("Fitness centers");
    
//     fetchFitnessCenters()
//       .then((res) => setCenters(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className='ml-14'>
//       <h2>Fitness Centers</h2>
//       <ul>
//         {centers.map((center) => (
//           <li key={center._id} onClick={() => onCenterClick(center._id)}>
//             {center.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FitnessCenterList;



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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg ml-32">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Fitness Centers</h2>
      <ul className="space-y-4">
        {centers.map((center) => (
          <li
            key={center._id}
            onClick={() => onCenterClick(center._id)}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 cursor-pointer transition-all"
          >
            <span className="text-xl font-medium text-gray-700">{center.name}</span>
            <span className="text-sm text-gray-500">{center.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessCenterList;
