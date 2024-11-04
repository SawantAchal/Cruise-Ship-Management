import stationeryModel from '../model/stationeryModel.js'
import fs from 'fs';

// add stationery 
const addStationeryItem = async (req , res) => {
    let image_filename = `${req.file.filename}` ;

    const stationery = new stationeryModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    try {
        await stationery.save();
        res.json({success:true,message:"stationery added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//display all the stationery item in db 
const allstationeryList = async (req , res) => {
    try {
        const stationeries = await stationeryModel.find({})
        res.json({success:true, data:stationeries ,message:"all stationery list"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//remove stationery item 
const removestationeryProduct = async (req , res) => {
    try {
        //find stationery model using id
        const stationery = await stationeryModel.findById(req.body.id)
        fs.unlink(`uploads/${stationery.image}` , () =>{})
        //delete data from db
        await stationeryModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"stationery removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export {addStationeryItem , allstationeryList ,removestationeryProduct}