import express from 'express'
import multer from 'multer'
import { addStationeryItem, allstationeryList, removestationeryProduct } from '../controllers/stationeryController.js';

const stationeryRouter = express.Router();

//imagestorage engine using multer disk
const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req, file ,cb) => {
        return cb(null , `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

stationeryRouter.post('/add-stationery' ,upload.single('image'), addStationeryItem)
stationeryRouter.get('/all-stationeryProduct' , allstationeryList)
stationeryRouter.post('/remove-stationeryProduct' , removestationeryProduct)


export default stationeryRouter;