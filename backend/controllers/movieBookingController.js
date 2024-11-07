import movieBookingModel from "../model/movieBookingModel.js"
import userModel from "../model/userModel.js";

const movieBooking = async(req, res) => {
    const frontend_url ="http://localhost:5173"
    try {
        const newMovieBooking = new movieBookingModel({
            userId:req.body.userId,
            movie:req.body.movieId,

            showtime:req.body.showtime,
            seats:req.body.seats,
            total_amount:req.body.total_amount,
        })
        await newMovieBooking.save();
        await userModel.findByIdAndUpdate(req.body.userId,{bookedMovies:{}})
        res.json({success:true, message:'booekd'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }
}

//for frontend in profile
const usersBookedMovies = async(req,res) => {
    try {
        const movies = await movieBookingModel.find({userId:req.body.userId})
            res.json({success:true,data:movies})
        }
    catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//find all the order of all user
//api to sent in admin panel
const listOfUserBookedMovie = async (req,res) => {
    // to fetch all the order details
    try {
        const movies = await movieBookingModel.find({});
        res.json({success:true,data:movies})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {movieBooking ,usersBookedMovies , listOfUserBookedMovie}