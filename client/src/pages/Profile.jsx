import { useSelector } from "react-redux"

export default function Profile() {
    const {currentUser}  = useSelector((state) => state.user);
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profilePage-img">
        <img src={currentUser.avatar} className="avatar-img" alt="profile-image" />
      </div>
      
        <div className='profile-contain'>
        
        <form  className='profile-wrapper'>
          <input type="text" name="username" placeholder='username' id="username" className='profile-i' />
          <input type="email" name="email" placeholder='email' id="email" className='profile-i' />
          <input type="password" name="password" placeholder='password' id="password" className='profile-i'  />
          <button className="update-btn">Update</button>
          <div className="link-container">
            <span className="delete-link">Delete Account</span>
            <span className="signout-link">Signout</span>
          </div>
        </form>
          
         
        
        </div>
      
      
    </div>
  )
}
