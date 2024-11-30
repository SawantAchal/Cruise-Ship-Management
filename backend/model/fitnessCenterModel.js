import mongoose from 'mongoose'

const fitnessCenterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'equipment' }],
    timeslots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'timeslot' }], // Add this line
}, { timestamps: true });

const fitnessCenterModel = mongoose.models.fitnessCenter || mongoose.model('fitnessCenter' , fitnessCenterSchema)

export default fitnessCenterModel