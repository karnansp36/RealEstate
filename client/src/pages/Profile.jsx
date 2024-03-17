import { useDispatch, useSelector } from "react-redux";
import {useRef, useState , useEffect} from 'react';
import { getDownloadURL, getStorage , ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from "../redux/users/userSlice";


export default function Profile() {
  const fileRef = useRef(null);
    const {currentUser, loading, error}  = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc ] = useState(0);
    const [fileUploadError, setFileUploadError ] =  useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
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
    //firebase storage
    // allow read;
    // allow write; if
    // request.resource.size < 2 * 1024 * 1024 && 
    // request.resource.contentType.matches('image/.*')
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      
      
        <div className='profile-contain'>
        
        <form onSubmit={handleSubmit}  className='profile-wrapper'>
          <div className="profilePage-img">
            <input type="file" name="avatarfile" id="avatar" ref={fileRef} hidden accept="image/*" onChange={(e)=> setFile(e.target.files[0])}/>
            <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} className="avatar-img" alt="profile-image" />
          </div>
          <div className="upload-percentage">
            {
              fileUploadError ? (
              <span className="upload-error">Error  In Image Upload! Try Again.(Image must be less than 2mb.)</span> ) 
              : filePerc > 0 && filePerc < 100 ?
              (<span className="upload-process">{`Upload ${filePerc}%`}</span>) 
              : filePerc === 100 ? (<span className="upload-success">Image successfully uploaded</span>):(" ")
            }
          </div>
          <input type="text" name="username" placeholder='username' id="username" className='profile-i' defaultValue={currentUser.username} onChange={handleChange}/>
          <input type="email" name="email" placeholder='email' id="email" className='profile-i' defaultValue={currentUser.email}  onChange={handleChange}/>
          <input type="password" name="password" placeholder='password' id="password" className='profile-i' onChange={handleChange} />
          <button className="update-btn" disabled={loading}>{loading ? 'Loading...' : 'Update'}</button>
          <div className="link-container">
            <span className="delete-link"  onClick={handleDeleteUser}>Delete Account</span>
            <span className="signout-link">Signout</span>
          </div>
        </form>
        </div>
      
      <p>{ error ? error : ' '}</p>
      <p className="update-success">{ updateSuccess ? 'User is updated successfully' : ''}</p>
    </div>
  )
}
