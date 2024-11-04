import express from 'express'
import multer from 'multer'
import { addMenuItem, allMenuList, removeMenuProduct } from '../controllers/menuController.js';

const menuRouter = express.Router();

//imagestorage engine using multer disk
const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req, file ,cb) => {
        return cb(null , `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

menuRouter.post('/add-menu' ,upload.single('image') , addMenuItem)
menuRouter.get('/all-menuItem' , allMenuList)
menuRouter.post('/remove-menuItem' , removeMenuProduct)


export default menuRouter;