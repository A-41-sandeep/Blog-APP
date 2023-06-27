import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React from 'react'
const Blog = ({title,description,imageURL,userName}) => {
  return (
    <div>
      <Card sx={{ width:"40%" ,margin:"auto",mt:2,padding:2,boxSizing:"5px 5px 10px #ccc", ":hover":{
        boxShadow:"10px 10px 20px #ccc"
      }}}>
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
        <Typography variant="body2" color="text.secondary">
        <b>{userName}</b> {": "} {description}
        </Typography>
      </CardContent>
       
    </Card>
    </div>
  )
}

export default Blog
