import equipmentModel from "../model/equipmentModel.js";
import fitnessCenterModel from "../model/fitnessCenterModel.js";

// Get equipment by fitness center
const getEquipment = async (req, res) => {
    const { fitnessCenterId } = req.params;
  
    try {
      const equipment = await equipmentModel.find({ fitnessCenter: fitnessCenterId });
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching equipment', error });
    }
  };
  
  // // Create equipment
  // const createEquipment = async (req, res) => {
  //   const { name, fitnessCenter } = req.body;
  
  //   try {
  //     const newEquipment = new equipmentModel({ name, fitnessCenter });
  //     await newEquipment.save();
  //     res.status(201).json(newEquipment);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error creating equipment', error });
  //   }
  // };

  const createEquipment = async (req, res) => {
    const { name, fitnessCenter } = req.body;
  
    try {
      const newEquipment = new equipmentModel({ name, fitnessCenter });
      await newEquipment.save();
  
      // Update fitness center to include the new equipment
      await fitnessCenterModel.findByIdAndUpdate(
        fitnessCenter,
        { $push: { equipment: newEquipment._id } },
        { new: true }
      );
  
      res.status(201).json(newEquipment);
    } catch (error) {
      console.log(error.message)
    }
  };
  
  
  // Delete equipment
  const deleteEquipment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedEquipment = await equipmentModel.findByIdAndDelete(id);
      if (!deletedEquipment) {
        return res.status(404).json({ message: 'Equipment not found' });
      }
      res.json({ message: 'Equipment deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting equipment', error });
    }
  };

export {getEquipment , createEquipment , deleteEquipment}