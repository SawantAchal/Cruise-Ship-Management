import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String , required:true , unique:true},
    email:{type:String , required:true , unique:true},
    mobile:{type:Number , required:true , unique:true},
    password:{type:String , required:true },
    cartData:{type:Object , default:{}},
    createdAt: { type: Date, default: Date.now, immutable: true }
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model('user' , userSchema)

export default userModel;