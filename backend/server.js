import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import menuRouter from './routes/menuRoutes.js';
import stationeryRouter from './routes/stationeryRoutes.js';
import userRouter from './routes/userRoute.js';
import dotenv from 'dotenv/config.js'
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import fitnessCenterRoute from './routes/fitnessCenterRoutes.js';
import equipmentRoute from './routes/equipmentRoutes.js';
import timeSlotRoute from './routes/timeSlotRoutes.js';
import bookingRoute from './routes/bookingRoutes.js';
import MovieRoutes from './routes/movieRoutes.js';
import movieBookingRoutes from './routes/movieBookingRoutes.js';

//App config
const app = express()
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use('/api/menu' , menuRouter)
app.use('/api/stationery' , stationeryRouter)
app.use('/images' , express.static('uploads'))
app.use('/api/user' , userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/fitnessCenter', fitnessCenterRoute)
app.use('/api/equipment', equipmentRoute)
app.use('/api/timeSlot', timeSlotRoute)
app.use('/api/fitnessBooking', bookingRoute)
app.use('/api/movies', MovieRoutes);
app.use('/api/bookings', movieBookingRoutes);



//request data from server
app.get("/" , (req , res) => {res.send("API WORKING")})

//run express server
app.listen(port , () => {
    console.log(`server running on ${port}`)
})
