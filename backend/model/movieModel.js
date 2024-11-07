import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name:{type:String , required:true},
    description :{type:String , required:true},
    language:{type:String , required:true},
    ticket_price:{type:Number , required:true},
    rating: { type: Number, required: true },
    showtimes: [{ type: String, required: true }]
})

const movieModel = mongoose.models.movie || mongoose.model('movie' , movieSchema)
export default movieModel;