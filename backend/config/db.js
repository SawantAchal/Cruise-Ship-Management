import mongoose from 'mongoose'

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://achalsawant0105:cruise123@cluster0.tzl5l.mongodb.net/').then(() => console.log('db connected'))
}