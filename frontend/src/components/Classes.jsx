import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const {url} = useContext(StoreContext)

  const fetchClasses = async () => {
    try {
      const response = await axios.get(url+"/api/fitnessCenter/allFitenessCenter");
      setClasses(response.data);
    } catch (error) {
      toast.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Fitness Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((fitnessClass) => (
          <Link key={fitnessClass._id} to={`/class-details/${fitnessClass._id}`} className="block bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{fitnessClass.name}</h2>
            <p>{fitnessClass.type}</p>
            <p className="text-gray-600">{fitnessClass.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Classes;
