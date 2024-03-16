import { useSelector } from "react-redux";
import {useRef, useState , useEffect} from 'react';
import { getDownloadURL, getStorage , ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'


export default function Profile() {
  const fileRef = useRef(null);
    const {currentUser}  = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc ] = useState(0);
    const [fileUploadError, setFileUploadError ] =  useState(false);
    const [formData, setFormData] = useState({});
    
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
    //firebase storage
    // allow read;
    // allow write; if
    // request.resource.size < 2 * 1024 * 1024 && 
    // request.resource.contentType.matches('image/.*')
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      
      
        <div className='profile-contain'>
        
        <form  className='profile-wrapper'>
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
