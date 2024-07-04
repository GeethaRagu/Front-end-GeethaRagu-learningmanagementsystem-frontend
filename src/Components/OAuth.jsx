import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInFailure, signInSuccess } from "../Redux/Slice/userSlice";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import APIError from "./APIError";
const OAuth = () => {
  const auth = getAuth(app);
  
  /**React hooks**/
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { totalItems } = useSelector((state) => state.cart);
  const error = useSelector((state)=>state.user.error);
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`${apiurl}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name:result.user.displayName,
            email:result.user.email,
            profilePic:result.user.photoURL
        }),
      });
      const data = await res.json();
      if(res.ok){
        localStorage.setItem('Token',data.token);
        dispatch(signInSuccess(data))
        if(totalItems>0){
          navigate('/cart');
        }
        else{
          navigate("/");
        }
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    
    }
  };

  return (
    <Button type="button" className="mt-5 px-2 py-1 bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500 rounded-lg text-white" onClick={handleSubmit}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
