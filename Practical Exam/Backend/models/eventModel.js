import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    ename:{
        type:String,
        required:true
    },
    edate:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

export default mongoose.model("Event",eventSchema);
