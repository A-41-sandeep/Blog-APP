import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Notifications from './Notifications';

const AddNotification = () => {

const getNotifications=async()=>{
    const userId=localStorage.getItem("userId");
    const Notification=await axios(`http://localhost:5000/api/user/getnotification/${userId}`).catch(err=>console.log(err));
    const data=await Notification.data;
    return data;
}
const [allnotifications,setAllnotifications]=useState([]);

useEffect(()=>{
getNotifications().then((data)=>setAllnotifications(data.notification));
},[])

    return (
    <div>
      {allnotifications && allnotifications.map((Notification,index)=>
        <Notifications key={index} username={Notification.name}/>
      )}
    </div>
  )
}

export default AddNotification
