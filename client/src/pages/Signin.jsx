import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/users/userSlice';
import OAuth from '../components/OAuth';
import '../components/Style.scss'
export default function Signin() {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      dispatch(signInStart());
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
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      Navigate('/');

    } catch(error) {
      dispatch(signInFailure(error.message));
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
          <OAuth/>
          </form>
         
          <div>already have account <Link to="/signup">signup</Link></div>
        
        </div>
        {error && <p className='error-text'>{error}</p>}
        
      </div>
      
    </div>
  )
}
