import express from 'express'
import { addTocart, getFromcart, removeFromcart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/addToCart' ,   authMiddleware ,addTocart)
cartRouter.post('/removeFromCart' ,  authMiddleware ,removeFromcart)
cartRouter.post('/getFromCart' , authMiddleware ,getFromcart)

export default cartRouter;