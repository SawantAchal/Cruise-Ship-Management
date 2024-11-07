import mongoose from "mongoose";

const movieBookingSchema = new mongoose.Schema({
    userId: { type:String, required: true },
    
    movie: { type: String,  required: true },
    showtime: { type: String, required: true },
    seats: [{ type: String, required: true }],
    total_amount: { type: Number, required: true },
    date:{type:Date,default:Date.now},
    payment:{type:Boolean,default:false},
},{ timestamps: true });

const movieBookingModel = mongoose.models.movieBooking || mongoose.model('movieBooking' , movieBookingSchema)
export default movieBookingModel;