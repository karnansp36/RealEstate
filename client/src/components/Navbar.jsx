import  { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom'
import './Style.scss'
import { useSelector } from 'react-redux';
import {
  FaSearch
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const {currentUser}= useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const Navigate = useNavigate();
  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    Navigate(`/search?${searchQuery}`);
  }

  useEffect(() =>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }

  },[location.search]);


  return (
    <div>
      <div className='navbar-container'>
        <div className='navbar'>
           <div className='brand-container'>
              <div className='brand-name'>RealEstate</div>
           </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="searchTerm" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className='searchBtn'>
                  <FaSearch className='searchIcon'/>
                </button>
            </form>
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
