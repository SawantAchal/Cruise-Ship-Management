import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { listOfUserOrders, placeOrder, updateStatus, usersOrder, verifyOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post('/place-order', authMiddleware ,placeOrder)
orderRouter.post('/verify-order' ,verifyOrder)
orderRouter.post('/user-orders' , authMiddleware , usersOrder)
orderRouter.get('/allUserOrders' ,listOfUserOrders)
orderRouter.post('/updateOrderStatus' , updateStatus)

export default orderRouter;