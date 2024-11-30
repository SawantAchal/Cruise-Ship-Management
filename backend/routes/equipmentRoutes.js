import express from 'express'
import { createEquipment, deleteEquipment, getEquipment } from '../controllers/equipmentController.js';


const equipmentRoute = express.Router();

equipmentRoute.get('/:fitnessCenterId'  ,getEquipment)
equipmentRoute.post('/createquipment'  ,createEquipment)
equipmentRoute.delete('/:id'  ,deleteEquipment)


export default equipmentRoute;