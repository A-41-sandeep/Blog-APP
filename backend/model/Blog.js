import mongoose from "mongoose"

const Schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:[{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }]
});

export  default mongoose.model("Blog",Schema);