import React, { useState } from 'react'

export default function Signup() {

  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data =await res.json();
    console.log(data);
  };
  return (
    <div>
      
      <div className='signup-container'>
        <form onSubmit={handleSubmit} className='signup-wrapper'>
          <input type="text" name="username" placeholder='username' id="username" className='signup-i' onChange={handleChange}/>
          <input type="email" name="email" placeholder='email' id="email" className='signup-i' onChange={handleChange}/>
          <input type="password" name="password" placeholder='password' id="password" className='signup-i'  onChange={handleChange}/>
          <button id='signup'>signup</button>
          </form>
          <button id='signup-google'>Sign Up with google</button> 
          <div>already have account <a href="#">signin</a></div>
        
      </div>
      
    </div>
  )
}
