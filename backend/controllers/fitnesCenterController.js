import fitnessCenterModel from "../model/fitnessCenterModel.js";

// Get all fitness centers
const getFitnessCenters = async (req, res) => {
    try {
      const centers = await fitnessCenterModel.find();
      res.json(centers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching fitness centers', error });
    }
  };
  

  // Create a fitness center
// const createFitnessCenter = async (req, res) => {
//     const { name, type, description } = req.body;
  
//     try {
//       const newCenter = new fitnessCenterModel({ name, type, description });
//       await newCenter.save();
//       res.status(201).json(newCenter);
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating fitness center', error });
//     }
//   };
const createFitnessCenter = async (req, res) => {
  const { name, type, description, equipment, timeslots } = req.body;

  try {
    const newCenter = new fitnessCenterModel({
      name,
      type,
      description,
      equipment, // Expecting an array of ObjectIds
      timeslots, // Expecting an array of ObjectIds
    });

    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating fitness center', error });
  }
};


  // Update a fitness center
const updateFitnessCenter = async (req, res) => {
    const { id } = req.params;
    const { name, type, description } = req.body;
  
    try {
      const updatedCenter = await fitnessCenterModel.findByIdAndUpdate(
        id,
        { name, type, description },
        { new: true }
      );
      if (!updatedCenter) {
        return res.status(404).json({ message: 'Fitness center not found' });
      }
      res.json(updatedCenter);
    } catch (error) {
      res.status(500).json({ message: 'Error updating fitness center', error });
    }
  };

  // Delete a fitness center
const deleteFitnessCenter = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedCenter = await fitnessCenterModel.findByIdAndDelete(id);
      if (!deletedCenter) {
        return res.status(404).json({ message: 'Fitness center not found' });
      }
      res.json({ message: 'Fitness center deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting fitness center', error });
    }
  };

//   // Get a specific fitness center by ID
// const getFitnessCenterById = async (req, res) => {
//   const { id } = req.params;

//   try {
//       const center = await fitnessCenterModel.findById(id);
//       if (!center) {
//           return res.status(404).json({ message: 'Fitness center not found' });
//       }
//       res.json(center);
//   } catch (error) {
//       res.status(500).json({ message: 'Error fetching fitness center', error });
//   }
// };

// Get a specific fitness center by ID
const getFitnessCenterById = async (req, res) => {
  const { id } = req.params;

  try {
    const center = await fitnessCenterModel
      .findById(id)
      .populate('equipment') // Populate equipment details
      .populate('timeslots'); // Populate time slot details

    if (!center) {
      return res.status(404).json({ message: 'Fitness center not found' });
    }

    res.json(center);
  } catch (error) {
    console.log(error.message)
  }
};


export { getFitnessCenters, createFitnessCenter, updateFitnessCenter, deleteFitnessCenter, getFitnessCenterById };
