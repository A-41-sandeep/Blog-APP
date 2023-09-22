import dotenv from 'dotenv';
dotenv.config({ path: './.env' });



import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";
const url=process.env.URL;
const PORT=process.env.PORT||5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect(`${url}`).then(()=>console.log("database connected")).catch(err=>console.log(err));

app.listen(PORT,()=>console.log("server running at 5000"))