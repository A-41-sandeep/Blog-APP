import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app=express();
app.use(express.json());

app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose.connect("mongodb+srv://Admin:a0QDASWZsoE5JLS3@cluster0.lhqg25a.mongodb.net/Blog?retryWrites=true&w=majority").then(()=>{
    app.listen(5000);}).then(()=>{
        console.log("connected to database , listening on port 5000")
    }).catch((err)=>{
        console.log(err);
    });


