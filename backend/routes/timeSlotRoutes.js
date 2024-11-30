import express from 'express'
import { createTimeSlot, deleteTimeSlot, getTimeSlots } from '../controllers/timeSlotController.js';


const timeSlotRoute = express.Router();

timeSlotRoute.get('/:fitnessCenterId'  ,getTimeSlots)
timeSlotRoute.post('/creatTimeSlot'  ,createTimeSlot)
timeSlotRoute.delete('/:id'  ,deleteTimeSlot)


export default timeSlotRoute;