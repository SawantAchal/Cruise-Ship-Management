import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({
    name :{type:String , required:true},
    description :{type:String , required:true},
    price :{type:Number , required:true},
    image :{type:String , required:true},
    category :{type:String , required:true},
})

const menuModel = mongoose.models.menu || mongoose.model('menu' , menuSchema)

export default menuModel