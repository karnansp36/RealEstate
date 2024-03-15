import React from 'react';
import {  Link } from 'react-router-dom'
import './Style.scss'
import { useSelector } from 'react-redux';

export default function Navbar() {
  const {currentUser}= useSelector((state) => state.user);
  return (
    <div>
      <div className='navbar-container'>
        <div className='navbar'>
           <div className='brand-container'>
              <div className='brand-name'>RealEstate</div>
           </div>
           <input type='search'  placeholder="Search Properties"/>
           <div className='navlinks'>
              <Link to='/' className='homeLink'>Home</Link>
              <Link to='/service' className='serviceLink'>Services</Link>
              <Link to='/about' className='aboutLink'>About</Link>
              <Link to='/profile' className='signinLink'>

                {currentUser ? (
                  <img className='profile-img' src={currentUser.avatar} alt='profile picture'/>
                ):(
                  <div  className='signinLink'>SignIn</div>
                ) }
              </Link>
              
           </div>
        </div>
      </div>
    </div>
  );
}
