import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedClass, token , url } = useContext(StoreContext);
  const [classDetails, setClassDetails] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(new Set());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const fetchClassDetails = async (id) => {
    try {
      const response = await axios.get(`${url}/api/fitnessCenter/${id}`);
      setClassDetails(response.data)
    } catch (error) {
      toast.error("Failed to fetch class details. Please try again later.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchClassDetails(id);
    } else {
      toast.error("Class ID is undefined");
    }
  }, [id]);

  const handleEquipmentChange = (equipmentId) => {
    setSelectedEquipment((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(equipmentId)) {
        newSelection.delete(equipmentId);
      } else {
        newSelection.add(equipmentId);
      }
      return newSelection;
    });
  };

  const handleBooking = async () => {
    if (!selectedTimeSlot) {
      toast.warning("Please select a time slot!");
      return;
    }
    if (selectedEquipment.size === 0) {
      toast.warning("Please select at least one piece of equipment!");
      return;
    }
    if (!token) {
      toast.warning("Token is missing. Please log in.");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const bookingData = {
      user: userId,
      fitnessCenter: classDetails._id,
      equipment: [...selectedEquipment],
      timeSlot: selectedTimeSlot,
    };

    try {
      const response = await axios.post(url+"/api/fitnessBooking/createBooking", bookingData, { headers: { Authorization: `Bearer ${token}` } });
      setSelectedClass({
        ...classDetails,
        selectedEquipment: [...selectedEquipment],
        selectedTimeSlot,
      });

      toast.success("Booking successful!");
      navigate("/profile");
    } catch (error) {
      toast.error("Error booking class:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 pt-36">
      <h1 className="text-2xl font-bold">{classDetails?.name}</h1>
      <p>{classDetails?.description}</p>
      <p className="text-gray-600">{classDetails?.type}</p>

      {/* Equipment Selection */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Available Equipment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {classDetails?.equipment?.length > 0 ? (
            classDetails.equipment.map((equipment) => (
              <label key={equipment._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedEquipment.has(equipment._id)}
                  onChange={() => handleEquipmentChange(equipment._id)}
                  className="form-checkbox"
                />
                <span>{equipment.name}</span>
              </label>
            ))
          ) : (
            <p>No equipment available.</p>
          )}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Select Time Slot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {classDetails?.timeslots?.length > 0 ? (
            classDetails.timeslots.map((slot) => (
              <button
                key={slot._id}
                onClick={() => setSelectedTimeSlot(slot._id)}
                className={`py-2 px-4 rounded-lg ${
                  selectedTimeSlot === slot._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {slot.time}
              </button>
            ))
          ) : (
            <p>No time slots available.</p>
          )}
        </div>
      </div>

      {/* Book Now Button */}
      <button onClick={handleBooking}  className="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">
        Book Now
      </button>
    </div>
  );
};

export default ClassDetails;
