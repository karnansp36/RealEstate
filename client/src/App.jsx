import { useState } from 'react'
import './components/Style.scss';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Service from './pages/Service'
import About from './pages/About'
import Home from './pages/Home'

function App() {

  return (
    <>
    
      <div className='navbar-container'>
        <div className='navbar'>
          <div className='brand-container'>
            <div className='brand-name'>RealEstate</div>
          </div>
          <div className='navlinks'>
            <Link to='/' className='homeLink'>Home</Link>
            <Link to='/service' className='serviceLink'>Services</Link>
            <Link to='/about' className='aboutLink'>About</Link>
            <Link to='/signin' className='signinLink'>signin</Link>
            <Link to='/signup' className='signupLink'>signup</Link>
          </div>
            
        </div>
      </div>
   

        
        <Routes>
          <Route path='/' element={<Home/>}>Home</Route>
          <Route path='/service' element={<Service/>}>Services</Route>
          <Route path='/about' element={<About/>}>About</Route>
          <Route path='/signin' element={<Signin/>}>Signin</Route>
          <Route path='/signup' element={<Signup/>}>Signup</Route>


        </Routes>
      

    </>
  )
}

export default App
