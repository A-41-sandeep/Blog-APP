import { Box,  InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useStyles } from './utils';
const labelStyles={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};


const AddBlog = ({setDisp,socket}) => {
  // const classes= useStyles();
  const navigate=useNavigate();
  const [inputs, setinputs] = useState({
    title:"",description:"",imageURL:""
  })
  useEffect(() => {
    
    const yourPostLikedHandler = () => {
       setDisp(true);
    };
    socket?.on("yourPostLiked", yourPostLikedHandler);

    return () => {
      socket?.off('yourPostLiked', yourPostLikedHandler);
    };
  }, [socket]);

  const handleChange=(e)=>{
    setinputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=> navigate("/blogs"));
  }

  const sendRequest=async ()=>{
    const res=await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch((err)=>console.log(err));

    const data= await res.data;
    return data;

  } 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box padding={3} borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(104,171,130,1) 83%, rgba(0,212,255,1) 100%);" border={3}  borderRadius={10} boxShadow="10px 10px 20px #ccc" margin={'auto'} marginTop={3} display='flex' flexDirection='column' width="80%"> 
          <Typography   fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={"center"}>
            Post Your Blog
          </Typography>
          <InputLabel    sx={labelStyles}>Title</InputLabel>
          <TextField   value={inputs.title} name='title' onChange={handleChange} margin='normal' variant='outlined'/>
          <InputLabel   sx={labelStyles}>Description</InputLabel>
          <TextField   value={inputs.description} name='description' onChange={handleChange}  margin='normal' variant='outlined'/>
          <InputLabel   sx={labelStyles}>Image</InputLabel>
          <TextField    value={inputs.imageURL} name='imageURL' onChange={handleChange} margin='normal' variant='outlined'/>
          <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog
