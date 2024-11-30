import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    fitnessCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'fitnessCenter', required: true },
    equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'equipment' }],
    timeSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'timeslot', required: true },
    status: { type: String, default: 'Pending' },
},{timestamps:true})

const bookingModel = mongoose.models.fitnessBooking || mongoose.model('fitnessBooking' ,bookingSchema )

export default bookingModel