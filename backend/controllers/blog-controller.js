import Blog from "../model/Blog.js";
import User from "../model/User.js";

import mongoose from "mongoose";

export const getAllBlogs=async (req,res,next)=>{
    let blogs;
    try {
        blogs=await Blog.find().populate("user");
    } catch (error) {
        return console.log(err);
    }

    if(!blogs)
        return res.status(404).json({message:"No Blogs found"});
    return res.status(200).json({blogs});

}

export const  addBlog=async (req,res,next)=>{
    const {title,description,image,user} =req.body;
    
    let existingUser;
    try {
        existingUser=await User.findById(user);
    } catch (error) {
        return console.log(err);
    }
    if(!existingUser)
    {
        res.status(400).json({message:"unable to find user by this ID"});

    }
    const blog=new Blog({
        title,
        description,
        image,
        user
    })
    try {
        const session=await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction(); 

    } catch (error) {
        return console.log(error);
    }
    return res.status(200).json({blog});
} 

export const updateBlog=async (req,res,next)=>{
    const blogId=req.params.id;
    const {title,description} =req.body;
    let blog;
    try {
        blog=await Blog.findByIdAndUpdate(blogId,{title,description});
    } catch (error) {
        return console.log(error);
    } 
    if(!blog)
    {
        return   res.status(500).json({message:"unable to update the Blog"});
    }
    return res.status(200).json({blog});
}

export const updateLike=async(req,res,next)=>{
    const blogId=req.params.id;
    const {userId}=req.body;
    
    let blog;
    try {
        blog=await Blog.findById(blogId);
    } catch (error) {
        console.log(error);
    }
    if(!blog)
    {
        return  res.status(500).json({message:"unable to update the like"});
    }
    let flag=0;
    blog.likes.forEach(element => {
        if(element.equals(userId))
            flag=1;
        });
    if(flag===1)
    {
       blog.likes=blog.likes.filter(val=> !(val.equals(userId)));  
    }
    else{
        blog.likes.push(userId);
    }
    blog.save();
    return   res.status(200).json({blog});
}

export const getBlogById=async (req,res,next)=>{
    const blogId=req.params.id;
    let blog;
    try {
        blog=await Blog.findById(blogId);
    } catch (error) {
        return console.log(error);
        
    }
    if(!blog)
        {return res.status(404).json({message:"Blog Not Found"});}
     return res.status(200).json({blog});
}



export const deleteBlogById=async (req,res,next)=>{
    const blogId=req.params.id;
    let blog;
    try {
        blog=await Blog.findByIdAndDelete(blogId).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.log(error);
        
    }
    if(!blog)
        {return res.status(500).json({message:"Blog Not Found"});}
    return res.status(200).json({message:"Blog deleted"});
}


export const getBlogsOfUser=async (req,res,wait)=>{
    const userId=req.params.id;
    let blogs;

    try {
        blogs=await User.findById(userId).populate("blogs");
        // blogs=blogs.blogs;    
    } catch (error) {
        return console.log(error);
    }
    if(!blogs)
    {
        return res.status(404).json({message:"NO Blog Found"});
    }
    return res.status(200).json({blogs});
}