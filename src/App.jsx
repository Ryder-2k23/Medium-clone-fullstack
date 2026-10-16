import { useState } from 'react';
import NotFound from "./components/notFound";
import{BrowserRouter, Routes, Route} from "react-router-dom"


import './App.css'
import Nav from './components/Nav';
import sideNav from './components/sideNav';

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage"
import  Profiles  from './pages/Profiles';
import SinglePost from './pages/SinglePost';
import Write from './pages/Write';
import AdminLog from './pages/AdminLog';
import AdminUserLog from './pages/AdminUserLog';
import AdminProfile from './pages/AdminProfile';



function App() {
  // const name = 'Success';
  return(
    <BrowserRouter>
      <Routes>
         <Route path='/' element = {<Home/>}/>
         <Route path='/landingpage' element={<LandingPage/>}/>
         <Route path='/profiles' element = {<Profiles/>}/>
         <Route path='/singlepost/:postId' element = {<SinglePost/>}/>
         <Route path ='/write' element = {<Write/>}/>

         <Route path='/adminlog' element = {<AdminLog/>}/>
         <Route path='/adminuserlog' element = {<AdminUserLog/>}/>
         <Route path='/adminprofile' element = {<AdminProfile/>}/>
         
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
