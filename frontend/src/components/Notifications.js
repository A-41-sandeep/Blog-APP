import React from 'react'
import {Avatar, Card, CardHeader} from '@mui/material'

const Notifications = ({username}) => {
  return (
    <div>
      <Card sx={{ width:"40%" ,margin:"auto",mt:2,padding:2,boxSizing:"5px 5px 10px #ccc",backgroundColor:"#DBC559", ":hover":{
        boxShadow:"10px 10px 20px #ccc",
      }}}>
 
      <CardHeader
        avatar={
          <Avatar
           sx={{ bgcolor: "red"}}>
            {username.charAt(0)}
          </Avatar>
        }
        
        title={`${username} liked you blog`}
      />
    </Card>
    </div>
  )
}

export default Notifications
