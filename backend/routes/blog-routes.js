import  express  from "express";
import { addBlog, deleteBlogById, getAllBlogs, getBlogById, getBlogsOfUser, updateBlog, updateLike } from "../controllers/blog-controller.js";

const blogRouter=express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.put("/update/:id/like",updateLike);
blogRouter.get("/:id",getBlogById);
blogRouter.delete("/:id",deleteBlogById);
blogRouter.get("/user/:id",getBlogsOfUser);

export default blogRouter;