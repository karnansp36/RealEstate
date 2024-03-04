import React from 'react';
import {  Link } from 'react-router-dom'
import './Style.scss'

export default function Navbar() {
  return (
    <div>
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
    </div>
  );
}
