import { FcGoogle } from "react-icons/fc"
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { app } from "@/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { signInSuccess } from "@/redux/user/userSlice";
import { useDispatch } from "react-redux";

const OAuth = () => {
  const path = useLocation().pathname;

  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: "POST",
        headers: {
          'Content-type' : "application/json",
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL
        }),
      });

      const data = await res.json();
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Button type="button" className="w-full" onClick={handleGoogleClick}>
      <FcGoogle className="h-6 w-6 mr-2"/>
      <span className="text-[15px]">
        {path === '/sign-up' ? 'Sign Up with Google' : 'Sign In with Google'}
      </span>
    </Button>
  );
}

export default OAuth;