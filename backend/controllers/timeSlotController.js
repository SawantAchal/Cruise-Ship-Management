import fitnessCenterModel from "../model/fitnessCenterModel.js";
import timeSlotModel from "../model/timeSlotModel.js";

// Get time slots by fitness center
const getTimeSlots = async (req, res) => {
    const { fitnessCenterId } = req.params;
  
    try {
      const timeSlots = await timeSlotModel.find({ fitnessCenter: fitnessCenterId });
      res.json(timeSlots);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching time slots', error });
    }
  };
  
  // Create time slot
  const createTimeSlot = async (req, res) => {
    const { time, fitnessCenter } = req.body;
  
    try {
      const newTimeSlot = new timeSlotModel({ time, fitnessCenter });
      await newTimeSlot.save();
            // Update fitness center to include the new equipment
            await fitnessCenterModel.findByIdAndUpdate(
              fitnessCenter,
              { $push: { timeslots: newTimeSlot._id } },
              { new: true }
            );
      res.status(201).json(newTimeSlot);
    } catch (error) {
      console.log(error.message)
    }
  };
  
  // Delete time slot
  const deleteTimeSlot = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTimeSlot = await timeSlotModel.findByIdAndDelete(id);
      if (!deletedTimeSlot) {
        return res.status(404).json({ message: 'Time slot not found' });
      }
      res.json({ message: 'Time slot deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting time slot', error });
    }
  };
  
  export {getTimeSlots , createTimeSlot, deleteTimeSlot}