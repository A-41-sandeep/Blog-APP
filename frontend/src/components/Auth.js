import { Box, Button, TextField , Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { authAction } from './../store/index';
const Auth = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [inputs, setinputs] = useState({
    name:"",email:"",password:""
  })
  const [isSignup,setIsSignup]=useState(false);
  const handleChange=(e)=>
  {
    setinputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

const sendRequest=async (type="login")=>{
  const res=await axios.post(`http://localhost:5000/api/user/${type}`,{
  name:inputs.name,  
  email:inputs.email,
    password:inputs.password
  }).catch(err=> console.log(err));

  const data=await res.data;
  return data; 
}

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);  
    if(isSignup)
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authAction.login())).then(()=>navigate("/blogs")).then(data=>console.log(data));
    else
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authAction.login())).then(()=>navigate("/blogs")).then(data=>console.log(data));
      
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={400} display={"flex"} flexDirection={'column'} alignItems={"center"} justifyContent={"center"} boxShadow={"10px 10px 20px #ccc"} padding={3} margin={"auto"} marginTop={5} borderRadius={5}>
          <Typography variant='h2' padding={3} textAlign="center">
             {isSignup?"Signup":"Login"}
          </Typography>
         {isSignup &&  <TextField name='name' onChange={handleChange} value={inputs.name} placeholder='name' margin="normal" />}
          <TextField name='email' onChange={handleChange} value={inputs.email} placeholder='email' type={'email'} margin="normal"/> 
          <TextField name='password' onChange={handleChange} value={inputs.password} placeholder='password' type={'password'} margin="normal"/> 
          <Button   variant="contained" sx={{borderRadius:3, marginTop:3}} color="warning" type='submit'>Submit</Button>
          <Button onClick={()=>setIsSignup(!isSignup)} sx={{borderRadius:3,marginTop:3}}>change to {isSignup==true?"login":"signup"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth
