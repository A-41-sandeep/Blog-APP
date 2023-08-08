import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import Blogs from "./components/Blogs";
import Auth from "./components/Auth";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store";
import AddNotification from "./components/AddNotification";
import { io } from 'socket.io-client';



function App() {
  
  const [socket,setSocket] =useState(null); 
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const islogedIn=useSelector(state=>state.islogedIn);
  console.log(islogedIn);
  
  const [disp,setDisp] = useState(false);
  useEffect(() => {
    
    const yourPostLikedHandler = () => {
       setDisp(true);
    };
    socket?.on("yourPostLiked", yourPostLikedHandler);

    return () => {
      socket?.off('yourPostLiked', yourPostLikedHandler);
    };
  }, [socket]);


  useEffect(() => {
    // Create the socket connection
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      // Clean up on unmount or when socket changes
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        if (localStorage.getItem("userId")) {
          dispatch(authAction.login());
          navigate("/blogs");
          console.log("hello emitted");
          socket.emit("hello", { userId: localStorage.getItem("userId") });
        }
      });
    }
  }, [socket, dispatch, navigate]);



     return <React.Fragment>
    <header>
      <Header  disp={disp} setDisp={setDisp}/>
    </header>
    <main>
      <Routes>
        { !islogedIn? <Route path="/auth" element={<Auth/>}/> :
       <> <Route path="/blogs" element={<Blogs setDisp={setDisp} socket={socket}/>}/>
        <Route path="/myBlogs" element={<UserBlogs setDisp={setDisp} socket={socket}/>}/>
        <Route path="/myBlogs/:id" element={<BlogDetails setDisp={setDisp} socket={socket}/>}/>
        <Route path="/add" element={<AddBlog setDisp={setDisp} socket={socket}/>}/>
        <Route path="/notification" element={<AddNotification setDisp={setDisp} socket={socket}/>}/> 
        </>
}

</Routes>
    </main>
  </React.Fragment>


}

export default App;
