import { useState } from 'react'
import './components/Styles.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Service from './pages/Service'
import About from './pages/About'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Listing from './pages/Listing';
import UpdateListing from './pages/UpdateListing';
import Listings from './pages/Listings';
import SearchList from './pages/SearchList';
import NotFoundPage from './pages/NotFoundPage';
function App() {

  return (
    <BrowserRouter>
    
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/listings/:listingId' element={<Listings/>}/>
          <Route path='/search' element={<SearchList/>}/>
          <Route path='/*' element={<NotFoundPage/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/profile'element={<Profile/>}/>
            <Route path='/listing' element={<Listing/>}/>
            <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
          </Route>
        </Routes>
      

    </BrowserRouter>
  )
}

export default App
