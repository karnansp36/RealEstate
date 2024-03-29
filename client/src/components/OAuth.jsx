import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import {  useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/users/userSlice';
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick =  async () => {
        try {
            
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider)

            const res =await fetch('api/auth/google', {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
               
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');



        } catch (error) {
            console.log("could not sign in with google", error);
        }
    };
  return (
    
         <button className='w-full h-12 mx-auto text-white bg-sky-500 rounded-3xl text-lg font-semibold hover:bg-transparent hover:border-2 flex items-center hover:text-sky-400 hover:border-sky-400' onClick={handleGoogleClick} type='button' id='signup-google'><img className='w-10 h-8 ps-2' src="https://cdn-icons-png.flaticon.com/128/720/720255.png" alt="" /><span className='w-3/4 text-center'>Sign Up with google</span></button> 
    
  )
}
