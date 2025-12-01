import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tickets: { 
        type: Number, 
        default: 1 },
    status: { 
        type: String, 
        enum: ['confirmed', 'waitlist', 'cancelled'],
        default: 'confirmed'
     },
},{timestamps:true})

export default mongoose.model("User",userSchema);
