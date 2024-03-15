import { useState } from 'react'
import './components/Style.scss';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Service from './pages/Service'
import About from './pages/About'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';

function App() {

  return (
    <BrowserRouter>
    
        <Navbar/>
   

        
        <Routes>
          <Route path='/' element={<Home/>}>Home</Route>
          <Route path='/service' element={<Service/>}>Services</Route>
          <Route path='/about' element={<About/>}>About</Route>
          <Route path='/signin' element={<Signin/>}>Signin</Route>
          <Route path='/signup' element={<Signup/>}>Signup</Route>
          <Route element={<PrivateRoute/>}>
            <Route path='/profile'element={<Profile/>}/>
          </Route>
        </Routes>
      

    </BrowserRouter>
  )
}

export default App
