import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useStyles } from './utils';
const Blog = ({socket,isUser,title,description,imageURL,userName,id}) => {
  const navigate=useNavigate();
  const handleEdit=()=>{
     navigate(`/myBlogs/${id}`);
  }
  
  const deleteRequest=async()=>{
    const res=await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err));
    const data=await res.data;
    return data;
  }
  const handleDelete=()=>{
     deleteRequest().then(()=> navigate("/")).then(()=> navigate("/myBlogs"));
  }

const [isLiked,setIsLiked]=useState(false);
const [likeCount,setLikeCount]=useState(0);

useEffect(()=>{
  getlikes().then((data)=>{
    setIsLiked(data.likes.includes(localStorage.getItem("userId")));
    setLikeCount(data.likes.length);
  })
},[]);

const getlikes=async()=>{
  const res=await axios.get(`http://localhost:5000/api/blog/${id}`);
  const data=await res.data.blog;
  return data;
}
 
const getSocketId=async()=>{
  const res=await axios.get(`http://localhost:5000/api/blog/${id}`);
  const data=await res.data.blog.user.socketId;
   return data;
}

const getUserName=async()=>{
  const myId=localStorage.getItem("userId");
  const res=await axios.get(`http://localhost:5000/api/user/${myId}`);
  const data=await res.data.user;
  return data;
}

const  handleLike=async()=>{
  await likeRequest().then((data)=>{
    setLikeCount(data.likes.length);
    // console.log(data)
  });

  if(!isLiked)
   {
    notificationRequest();
    let userName;
    getUserName().then((data)=>userName=data.name);
    getSocketId().then((data)=>{
    socket.emit("postLiked",{
      userName,
      socketId:data
   })});

  }

  setIsLiked(!isLiked);


}

const likeRequest=async()=>{

    const res=await axios.put(`http://localhost:5000/api/blog/update/${id}/like`,{
      userId:localStorage.getItem("userId")
    }).
    catch(err=>console.log(err))
    const data=await res.data.blog;
    return data;
}

const notificationRequest= async()=>{
  const userId=localStorage.getItem("userId");
  const res=await axios.put(`http://localhost:5000/api/user/notificationupdate/${userId}`,{
    blogId:id
  }).catch(err=>console.log(err));

  const data=await res.data.notification;
  return data;
  
   }

  return (

    <div>
      <Card sx={{ width:"40%" ,margin:"auto",mt:2,padding:2,boxSizing:"5px 5px 10px #ccc", ":hover":{
        boxShadow:"10px 10px 20px #ccc"
      }}}>

      {
        isUser && (
          <Box display='flex'>
            <IconButton onClick ={handleEdit} sx={{marginLeft:'auto'}}><EditIcon color="warning" /></IconButton>
            <IconButton onClick={handleDelete}><DeleteForeverIcon color="error"/></IconButton>
          </Box>
        )
      }  


      <CardHeader
        avatar={
          <Avatar
           sx={{ bgcolor: "red"}}>
            {userName.charAt(0)}
          </Avatar>
        }
        
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      
      <CardContent>
        <hr/>
        <br/>
        <Typography variant="body2" color="text.secondary">
        <b>{userName}</b> {": "} {description}
        </Typography>
      </CardContent>

      <Box display={'flex'}>
        <IconButton><StarsOutlinedIcon onClick={handleLike} color={isLiked?"primary":"inherit"}/></IconButton>
        <Typography sx={{marginLeft:'5px',marginTop:'5px'}}>{likeCount}</Typography>
      </Box>
       
    </Card>
    </div>
  )
}

export default Blog
