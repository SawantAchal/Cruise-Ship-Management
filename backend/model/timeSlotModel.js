import mongoose from 'mongoose'

const timeSlotSchema = new mongoose.Schema({
    time :{type:String , required:true},
    fitnessCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'fitnessCenter' },
},{timestamps:true})

const timeSlotModel = mongoose.models.timeSlot || mongoose.model('timeslot' ,timeSlotSchema )

export default timeSlotModel