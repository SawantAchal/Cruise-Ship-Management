import mongoose from 'mongoose'

const equipmentSchema = new mongoose.Schema({
    name :{type:String , required:true},
    fitnessCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'fitnessCenter' },
},{timestamps:true})

const equipmentModel = mongoose.models.equipment || mongoose.model('equipment' ,equipmentSchema )

export default equipmentModel