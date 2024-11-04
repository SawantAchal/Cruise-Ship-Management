import menuModel from '../model/menuModel.js'
import fs from 'fs';

//add menu item 
const addMenuItem  = async (req, res) => {
    let image_filename = `${req.file.filename}` ;

    const menu = new menuModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    try {
        await menu.save();
        res.json({success:true,message:"menu added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//display all the menu item in db 
const allMenuList = async (req , res) => {
    try {
        const menus = await menuModel.find({})
        res.json({success:true, data:menus ,message:"all menu list"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//remove menu item 
const removeMenuProduct = async (req , res) => {
    try {
        //find menu model using id
        const menu = await menuModel.findById(req.body.id)
        fs.unlink(`uploads/${menu.image}` , () =>{})
        //delete data from db
        await menuModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"menu removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addMenuItem ,allMenuList,removeMenuProduct}