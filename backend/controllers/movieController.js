import movieModel from "../model/movieModel.js"

const addmovie = async(req, res) => {
    const movie = new movieModel({
        name:req.body.name,
        description:req.body.description,
        ticket_price:req.body.ticket_price,
        language:req.body.language,
        rating:req.body.rating,
        showtimes:req.body.showtimes
    })
    try {
        await movie.save()
        res.json({success:true,message:"movie added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const allMovieList = async(req, res) =>{
    try {
        const movie = await movieModel.find({})
        res.json({success:true, data:movie ,message:"all movie list"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const removeMovie = async(req , res) => {
    try {
        const movie = await movieModel.findById(req.body.id)
        await movieModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"movie removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addmovie,allMovieList,removeMovie}