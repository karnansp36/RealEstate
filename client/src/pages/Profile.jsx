import { useDispatch, useSelector } from "react-redux";
import {useRef, useState , useEffect} from 'react';
import { getDownloadURL, getStorage , list, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import { updateUserStart,
   updateUserSuccess,
    updateUserFailure,
     deleteUserStart,
      deleteUserSuccess,
       deleteUserFailure,
      signOutUserStart,
    signOutUserSuccess,
  signOutUserFailure } from "../redux/users/userSlice";
import { Link } from "react-router-dom";


export default function Profile() {
  const fileRef = useRef(null);
    const {currentUser, loading, error}  = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc ] = useState(0);
    const [fileUploadError, setFileUploadError ] =  useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const dispatch = useDispatch();
    console.log(formData);
    
    useEffect(()=>{
      if(file){
        handleFileUpload(file);
      }
      
    },[file]);

    const handleFileUpload = (file) =>{
      const storage =getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);

      //condition to get imgage less than 2mb and upload  in firebase
      uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        setFilePerc(Math.round(progress));
      },

      //To Handle Error in file uploading
      (error) =>{
        setFileUploadError(true);
      },

      //To Get download Url  after File Uploaded Successfully
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
          setFormData({...formData, avatar: downloadURL});
        });
      }

      );

    }


    const handleChange= (e) => {
      setFormData({...formData, [e.target.id] : e.target.value });
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
        
        
      } catch (error) {
        dispatch(updateUserFailure(error.message));
      }
    }

    //Deleting the user account
    const handleDeleteUser = async () =>{
     

      try {
        dispatch(deleteUserStart());
        
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method:"DELETE",          
        })
        const data =await res.json();

        if(data.success ===false){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    }

    const handleSignOut = async() => {
      try {
        dispatch(signOutUserStart());
        const res = await fetch('/api/auth/signout');
        const data = await res.json();
        if(data.success===false){
          dispatch(signOutUserFailure(data.message));
        }
        dispatch(signOutUserSuccess(data));
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
    }



    const handleShowListings = async() =>{
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data= await res.json();
        if(data.success === false){
          setShowListingsError(true);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    }

    const handleListingDelete = async(listingId) => {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`,{
          method:'DELETE',

        });
        const data = await res.json();
        if(data.success === false){
          console.log(data.message);
          return;
        }
        setUserListings((prev) => prev.filter((listing) =>listing._id !== listingId))
      } catch (error) {
        console.log(error.message);
      }
    }
    
  return (
    <div>

    <div className="w-screen h-screen flex flex-col mt-9  justify-center items-center">
      <h1 className="text-3xl font-bold pb-5">Profile</h1>
        <div className='w-full md:w-2/4 xl:w-2/6 2xl:w-3/12 lg:w-2/5 h-2/3 p-5 md:border-2 bg-white rounded-lg'>
        <form onSubmit={handleSubmit}  className='flex flex-col justify-evenly items-center w-full h-full '>
          <div className="w-16 h-16 overflow-hidden rounded-full ">
            <input type="file" name="avatarfile" id="avatar" ref={fileRef} hidden accept="image/*" onChange={(e)=> setFile(e.target.files[0])}/>
            <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} className="w-18 h-18 object-cover " alt="profile-image" />
          </div>
          <div className="w-full">
            {
              fileUploadError ? (
              <span className="">Error  In Image Upload! Try Again.(Image must be less than 2mb.)</span> ) 
              : filePerc > 0 && filePerc < 100 ?
              (<span className="">{`Upload ${filePerc}%`}</span>) 
              : filePerc === 100 ? (<span className="">Image successfully uploaded</span>):(" ")
            }
          </div>
          <input type="text" name="username" placeholder='username' id="username" className='h-12 ps-3 rounded-3xl bg-sky-100 focus:outline-sky-400 w-full ' defaultValue={currentUser.username} onChange={handleChange}/>
          <input type="email" name="email" placeholder='email' id="email" className='h-12 ps-3 rounded-3xl bg-sky-100 focus:outline-sky-400 w-full ' defaultValue={currentUser.email}  onChange={handleChange}/>
          <input type="password" name="password" placeholder='password' id="password" className='h-12 ps-3 rounded-3xl bg-sky-100 focus:outline-sky-400 w-full ' onChange={handleChange} />
          <button className="w-full h-12 mx-auto bg-slate-900 text-white rounded-3xl text-lg font-semibold hover:bg-transparent hover:border-2 hover:text-slate-900 hover:border-slate-900" disabled={loading}>{loading ? 'Loading...' : 'Update'}</button>
          <Link to='/listing' className="w-full h-12 flex justify-center items-center bg-sky-400 text-white rounded-3xl text-lg font-semibold hover:bg-transparent hover:border-2 hover:text-sky-400 hover:border-sky-400">Create Listing</Link>
          <div className="w-full flex justify-between items-center">
            <span className="text-red-600 cursor-pointer"  onClick={handleDeleteUser}>Delete Account</span>
            <span className="text-red-600 cursor-pointer" onClick={handleSignOut}>Signout</span>
          </div>
        </form>
        <p>{ error ? error : ' '}</p>
        <p className="text-center text-green-500">{ updateSuccess ? 'User is updated successfully!' : ''}</p>
        </div>
      
      
      <button className="bg-red-400 w-3/5 md:w-1/4 m-6 h-12 rounded-3xl text-white text-xl" onClick={handleShowListings}>Show Listings</button>
      <p>{showListingsError? 'Error in Showing Listings': ''}</p>
      </div>
            
      {userListings && userListings.length > 0 &&
     <div className="w-full h-full flex justify-center items-center flex-col">
     <h2 className="text-2xl font-semibold ">Your Listings</h2>
     {userListings.map((listings) => (
       <div key={listings._id} className="w-3/4 md:w-3/4 lg:w-3/5 xl:w-3/6 h-full md:h-48  flex justify-between items-center md:flex-row flex-col border-2 p-3 my-3">
         <div className="w-full md:w-3/4 h-full  flex justify-start items-center md:flex-row flex-col">
           <Link className=" w-full md:w-3/5 lg:w-3/6 xl:w-2/5 md:h-full h-80 bg-red-200 overflow-hidden mb-3 md:mb-0 md:mr-3" to={`/listings/${listings._id}`}>
             <img src={listings.imageUrls[0]} alt="listing cover" className="w-full h-full object-cover" />
           </Link>
           <div className="w-full h-28 md:w-2/3 md:h-auto md:mb-3 md:ml-3">
             <Link to={`/listings/${listings._id}`}>
               <div className="w-full h-full ">{listings.name}</div>
             </Link>
           </div>
         </div>
         <div className="flex flex-row md:justify-evenly justify-between items-center w-full  h-full md:flex-col md:items-start md:w-1/4">
           <button className="w-32 h-10 bg-red-600 rounded-3xl text-white font-bold  " onClick={() => handleListingDelete(listings._id)}>Delete</button>
           <Link to={`/update-listing/${listings._id}`}>
             <button className="w-32 h-10 bg-sky-600 rounded-3xl text-white font-bold">Edit</button>
           </Link>
         </div>
       </div>
     ))}
   </div>
   
      }
       
    
    </div>
  )
}
