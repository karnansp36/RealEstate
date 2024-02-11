import { useState } from 'react'

import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Service from './pages/Service'
import About from './pages/About'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      Hello
   

        <Link to='/'>Home</Link>
        <Link to='/service'>Services</Link>
        <Link to='/about'>About</Link>
        <Link to='/signin'>signin</Link>
        <Link to='/signup'>signup</Link>
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
