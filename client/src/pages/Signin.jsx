import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

export default function Signin() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      Navigate('/');

    } catch(error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div>
      
      <div className='signup-container'>
        <div className='signup-contain'>
        
        <form onSubmit={handleSubmit} className='signup-wrapper'>
          <input type="email" name="email" placeholder='email' id="email" className='signup-i' onChange={handleChange}/>
          <input type="password" name="password" placeholder='password' id="password" className='signup-i'  onChange={handleChange}/>
          <button id='signup' disabled={loading}>{loading? 'Loading...' : 'Sign in'}</button>
          </form>
          <button id='signup-google'>Sign Up with google</button> 
          <div>already have account <Link to="signup">signup</Link></div>
        
        </div>
        {error && <p className='error-text'>{error}</p>}
        
      </div>
      
    </div>
  )
}
