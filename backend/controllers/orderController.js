import orderModel from "../model/orderModel.js";
import userModel from '../model/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async(req,res) => {
    const frontend_url ="http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            roomNo:req.body.roomNo
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        //payment link using stripe
        const line_items = req.body.items.map((item) => ({
            price_data:{
                currency:"usd",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })
        //session created 
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }
}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if (success=='true') {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//user order for frontend
const usersOrder = async(req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
            res.json({success:true,data:orders})
        }
    catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//find all the order of all user
//api to sent in admin panel
const listOfUserOrders = async (req,res) => {
    // to fetch all the order details
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//api to update status of order 
const updateStatus = async (req , res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


export {placeOrder ,verifyOrder,usersOrder,listOfUserOrders,updateStatus}