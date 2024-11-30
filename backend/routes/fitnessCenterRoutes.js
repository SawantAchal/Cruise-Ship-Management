import express from 'express'
import { createFitnessCenter, deleteFitnessCenter, getFitnessCenterById, getFitnessCenters, updateFitnessCenter } from '../controllers/fitnesCenterController.js';


const fitnessCenterRoute = express.Router();

fitnessCenterRoute.get('/allFitenessCenter'  ,getFitnessCenters)
fitnessCenterRoute.post('/createFitnessCenter'  ,createFitnessCenter)
fitnessCenterRoute.get('/:id', getFitnessCenterById); // Add this route
fitnessCenterRoute.put('/:id'  ,updateFitnessCenter)
fitnessCenterRoute.delete('/:id'  ,deleteFitnessCenter)


export default fitnessCenterRoute;