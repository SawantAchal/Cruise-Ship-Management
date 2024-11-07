import userModel from "../model/userModel.js"

const addMovietoUser = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let bookedMovies = await userData.bookedMovies;
        if (!bookedMovies[req.body.movieId]) {
            bookedMovies[req.body.movieId] = 1;
        } else {
            bookedMovies[req.body.movieId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{bookedMovies})
        res.json({success:true,message:"movie added to cart"})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

const removeFromMovieCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let bookedMovies = await userData.bookedMovies;
        if (bookedMovies[req.body.movieId]>0) {
            bookedMovies[req.body.movieId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{bookedMovies});
        res.json({success:true,message:"Removed From movie Cart"})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

const getFromMovieCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let bookedMovies = await userData.bookedMovies;
        res.json({success:true,bookedMovies})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

export {addMovietoUser ,removeFromMovieCart ,getFromMovieCart}