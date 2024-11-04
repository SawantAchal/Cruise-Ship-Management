import mongoose from 'mongoose'

const stationerySchema = new mongoose.Schema({
    name :{type:String , required:true},
    description :{type:String , required:true},
    price :{type:Number , required:true},
    image :{type:String , required:true},
    category :{type:String , required:true},
})

const stationeryModel = mongoose.models.stationery ||  mongoose.model('stationery' , stationerySchema)

export default stationeryModel;