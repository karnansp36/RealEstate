import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function Signup() {

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
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const data =await res.json();
      console.log(data);
      if(data.success === false){
        setError(data.message);
        setLoading(false)
        return;
      }
      setLoading(false);
      setError(null);
      Navigate('/signin');
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
   
  };
  return (
    <div className='flex flex-col justify-center items-center  w-screen h-screen'>
      
      <div className='w-full md:w-2/4 xl:w-2/6 2xl:w-3/12 lg:w-2/5 h-2/3 p-5 md:border-2 bg-white rounded-lg'>
        <div className='text-2xl font-semibold p-5 w-full text-center'>Sign<span className='text-sky-400'>Up</span> to Real<span className='text-sky-400'>Estate</span></div>
        <div className=' mx-auto w-full h-2/3   '>
          <form onSubmit={handleSubmit} className='flex flex-col justify-evenly w-full h-full  '>
            <input type="text" name="username" placeholder='username' id="username" className='h-12 ps-3 rounded-3xl bg-sky-50 focus:outline-sky-400' onChange={handleChange}/>
            <input type="email" name="email" placeholder='email' id="email" className='h-12 ps-3 rounded-3xl bg-sky-50 focus:outline-sky-400' onChange={handleChange}/>
            <input type="password" name="password" placeholder='password' id="password" className='h-12 ps-3 rounded-3xl bg-sky-50 focus:outline-sky-400'  onChange={handleChange}/>
            <button id='signup' className='w-full h-12 mx-auto bg-green-600 text-white rounded-3xl text-lg font-semibold hover:bg-transparent hover:border-2 hover:text-green-600 hover:border-green-600' disabled={loading}>{loading? 'Loading...' : 'Sign Up'}</button>
            <OAuth/>
          </form>
        <div className='w-full text-center'>already have account <Link to="/signin" className='text-sky-400 text-xl font-semibold'>SignIn</Link></div>
        {error && <div className='w-full text-center pt-7 text-lg text-red-600'>{error}</div>}
        </div>
      </div>
      
    </div>
  )
}
