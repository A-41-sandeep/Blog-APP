import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import Auth from "./components/Auth";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';
import { useSelector } from "react-redux";
function App() {
  const islogedIn=useSelector(state=>state.islogedIn);
  console.log(islogedIn);
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/myBlogs" element={<UserBlogs/>}/>
        <Route path="/myBlogs/:id" element={<BlogDetails/>}/>
        <Route path="/add" element={<AddBlog/>}/>

</Routes>
    </main>
  </React.Fragment>


}

export default App;
