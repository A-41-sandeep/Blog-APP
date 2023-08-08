import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";
import User from "./model/User.js";
const app = express();

import { createServer } from 'http';
import { Server } from "socket.io";

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect("mongodb+srv://Admin:a0QDASWZsoE5JLS3@cluster0.lhqg25a.mongodb.net/Blog?retryWrites=true&w=majority").then(()=>console.log("database connected")).catch(err=>console.log(err));

const updateSocketId=async(userId,socketId)=>{
  await User.findByIdAndUpdate(userId,{socketId:socketId}).catch(err=>console.log(err));
}

const server=createServer(app);
const io=new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:['GET','POST']
  }
});
io.on('connection',(socket)=>{ 
  socket.on("hello",({userId})=>{
    updateSocketId(userId,socket.id);

  });
   
  socket.on("postLiked",({userName,socketId})=>{
    console.log(socketId," ",socket.id);
    io.to(socketId).emit("yourPostLiked",{userName});
    });
    socket.on("disconnect",()=>console.log("user disconnected"))
});


server.listen(5000,()=>console.log("server running at 5000"))