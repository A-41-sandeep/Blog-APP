import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
const BlogDetails = () => {
  const navigate=useNavigate();

  const [blog,setBlog]=useState();
  const id=useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState();

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));
  }

  const fetchDetails=async()=>{
    const res=await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err)=>console.log(err));

    const data=await res.data;
    return data;
  }

  
  useEffect(()=>{
    fetchDetails().then(data=>{
      setInputs({title:data.blog.title,description:data.blog.description});
      setBlog(data.blog);})
  },[id]);

  const sendRequest=async()=>{
      const res=await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
        title:inputs.title,
        description:inputs.description,
      }).catch(err=>console.log(err));

      const data=await res.data.blog;
      return data;
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs/"));
  }
  console.log(blog);

const labelStyles={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};

  return (
    <div>
       {inputs && <form onSubmit={handleSubmit}>
        <Box padding={3} borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(104,171,130,1) 83%, rgba(0,212,255,1) 100%);" border={3}  borderRadius={10} boxShadow="10px 10px 20px #ccc" margin={'auto'} marginTop={3} display='flex' flexDirection='column' width="80%"> 
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={"center"}>
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField value={inputs.title} name='title' onChange={handleChange} margin='normal' variant='outlined'/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField value={inputs.description} name='description' onChange={handleChange}  margin='normal' variant='outlined'/>           
          <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type='submit'>Submit</Button>
        </Box>
      </form>}
    </div>
  )
}

export default BlogDetails
