import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Notifications from './Notifications';

const AddNotification = ({setDisp,socket}) => {

const getNotifications=async()=>{
    const userId=localStorage.getItem("userId");
    const Notification=await axios(`http://localhost:5000/api/user/getnotification/${userId}`).catch(err=>console.log(err));
    const data=await Notification.data;
    return data;
}
const [update,setUpdate]=useState(true);
const [allnotifications,setAllnotifications]=useState([]);
useEffect(()=>{
  getNotifications().then((data)=>setAllnotifications(data.notification.reverse()));
},[update]);

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
  socket.on("yourPostLiked", (data) => {
    console.log(`${data.userName} liked your  blog`);
    getNotifications().then((data)=>setAllnotifications(data.notification.reverse()));
  });
  
  return () => {
    socket?.off("yourPostLiked");
  };
}, [socket]);
const deleteNotiReq=async()=>{
  const  userId=localStorage.getItem("userId");
  const res=await axios.put(`http://localhost:5000/api/user/deleteNotifications/${userId}`,{});
  const data=res.data;
  return data
}

const handleDeleteNotification=async()=>{
  deleteNotiReq().then(()=>console.log("notification deleted"));
  setUpdate(!update);
}

    return (
      <>
      <div style={{display:'flex',justifyContent:'center' ,padding:"20px"}}>
      <button onClick={handleDeleteNotification} style={{ width:"44%",padding:5,boxSizing:"5px 5px 10px #ccc",borderRadius:"5%"}}>Clear Notifications</button></div>
      {allnotifications && allnotifications.map((Notification,index)=>
        <Notifications key={index} username={Notification.name}/>
      )}
      
    </>
  )
}

export default AddNotification
