import { createContext, useEffect, useState } from "react";
import auth from '../Firebase/Firebase_init'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import AxiosPublic from "../Components/Hooks/AxiosPublic";

export const AuthContext = createContext(null)
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = AxiosPublic()

  const donateUserRegistration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Donor Login
  const donorUserLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update profile
  const UpdateProfile = (name, image) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    })
  }

  // Logout
  const signout = () => {
    return signOut(auth)
  }



  // Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email }
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            // console.log(res.data)
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token)
            }
          })
      }
      else {
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem('access-token');
      }
      // console.log('Current User ==>', currentUser);
      setLoading(false);
    });

    // Cleanup function for onAuthStateChanged
    return () => unsubscribe();
  }, []);


  const userInfo = {
    user,
    loading,
    UpdateProfile,
    donorUserLogin,
    donateUserRegistration,
    signout,
    setLoading,
    name: 'meghla'
  }
  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  )
}
