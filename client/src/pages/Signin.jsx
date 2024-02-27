import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

export default function Signin() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState(null);
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/signin', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data =await res.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false)
      return;
    }
    setLoading(false);
    Navigate('/');
    console.log(data);
  };
  return (
    <div>
      
      <div className='signup-container'>
        <form onSubmit={handleSubmit} className='signup-wrapper'>
          <input type="email" name="email" placeholder='email' id="email" className='signup-i' onChange={handleChange}/>
          <input type="password" name="password" placeholder='password' id="password" className='signup-i'  onChange={handleChange}/>
          <button id='signup' disabled={loading}>{loading? 'Loading...' : 'Sign Up'}</button>
          </form>
          <button id='signup-google'>Sign Up with google</button> 
          <div>already have account <Link to="/signup">signup</Link></div>
        
      </div>
      
    </div>
  )
}
