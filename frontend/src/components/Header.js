import React, { useEffect, useRef, useState } from "react";
import { AppBar, Typography ,Toolbar,Box,Button, Tabs,Tab} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from './../store/index';
const Header = () => {
  const [value,setValue]=useState();
  const islogedIn=useSelector(state=>state.auth.islogedIn);
  const dispatch=useDispatch();

 
  return (
    <AppBar position="sticky" sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(104,171,130,1) 83%, rgba(0,212,255,1) 100%);"}}>
      <Toolbar>
        <Typography variant="h4">Blog App</Typography>
       { islogedIn && <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
          <Tabs textColor="inherit"  value={value} onChange={(e,val)=>setValue(val)}>
            <Tab LinkComponent={Link} to={"/blogs"} label="All Blogs"/>
            <Tab LinkComponent={Link} to={"/myBlogs"} label="My Blogs"/>
            <Tab LinkComponent={Link} to={"/add"} label="Add Blog"/>
          </Tabs>
        </Box>}
       
        <Box display="flex" marginLeft="auto">
        { !islogedIn &&  <Button LinkComponent={Link} to={"/"} variant="contained" sx={{margin:1,borderRadius:10}}>Login/Signup</Button>}
          
          
          { islogedIn && <Button onClick={()=>dispatch(authAction.logout())} LinkComponent={Link} to={"/"} variant="contained" sx={{margin:1,borderRadius:10}}>Logout</Button>}

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
