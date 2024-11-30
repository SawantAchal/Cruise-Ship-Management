import bookingModel from "../model/bookingModel.js";
import timeSlotModel from "../model/timeSlotModel.js";
import equipmentModel from "../model/equipmentModel.js";
import userModel from "../model/userModel.js";


// Create a new booking
// const createBooking = async (req, res) => {
//     const { user, fitnessCenter, equipment, timeSlot } = req.body;
  
//     try {
//       const newBooking = new bookingModel({ user, fitnessCenter, equipment, timeSlot });
//       await newBooking.save();
//       res.status(201).json(newBooking);
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating booking', error });
//     }
//   };
  
const createBooking = async (req, res) => {
  const { user, fitnessCenter, equipment, timeSlot } = req.body;

  try {
      // Check if timeSlot belongs to the fitnessCenter
      const validTimeSlot = await timeSlotModel.findOne({ _id: timeSlot, fitnessCenter });
      if (!validTimeSlot) {
          return res.status(400).json({ message: 'Invalid time slot for the selected fitness center' });
      }

      // Check if all equipment belongs to the fitnessCenter
      const validEquipment = await equipmentModel.find({
          _id: { $in: equipment },
          fitnessCenter,
      });
      if (validEquipment.length !== equipment.length) {
          return res.status(400).json({ message: 'Invalid equipment for the selected fitness center' });
      }

      // Ensure no overlapping bookings for the same time slot
      const overlappingBooking = await bookingModel.findOne({ fitnessCenter, timeSlot });
      if (overlappingBooking) {
          return res.status(400).json({ message: 'Time slot already booked' });
      }

      // Create booking
      const newBooking = new bookingModel({ user, fitnessCenter, equipment, timeSlot });
      const savedBooking = await newBooking.save();

      // Update the user model with the new booking
      await userModel.findByIdAndUpdate(user, { $push: { fitnessBookings: savedBooking._id } });

      res.status(201).json(newBooking);
  } catch (error) {
    console.log(error.message)
      res.status(500).json({ message: 'Error creating booking', error });
  }
};

  // Get bookings by user
  // const getBookingsByUser = async (req, res) => {
  //   const { userId } = req.params;
  
  //   try {
  //     const bookings = await bookingModel.find({ user: userId }).populate('fitnessCenter equipment timeSlot');
  //     res.json(bookings);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error fetching bookings', error });
  //   }
  // };

  const getBookingsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await bookingModel
            .find({ user: userId })
            .populate('fitnessCenter', 'name type')
            .populate('equipment', 'name')
            .populate('timeslot', 'time');

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

  
  // Get bookings by fitness center
  const getBookingsByFitnessCenter = async (req, res) => {
    const { fitnessCenterId } = req.params;
  
    try {
      const bookings = await bookingModel.find({ fitnessCenter: fitnessCenterId }).populate('user equipment timeSlot');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  };

  export {createBooking , getBookingsByFitnessCenter , getBookingsByUser}