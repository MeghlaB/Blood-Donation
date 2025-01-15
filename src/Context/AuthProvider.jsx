import { createContext, useEffect, useState } from "react";
import auth from '../Firebase/Firebase_init'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
  
  export const AuthContext = createContext(null)
  export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
      const UpdateProfile = (name,image) => {
          setLoading(true)
          return updateProfile(auth.currentUser,{
            displayName: name,
          photoURL: image,
          })
        }

  // Logout
const signout =()=>{
  return signOut(auth)
}


  
      // Auth State
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          console.log("CurrentUser -->", currentUser);
          setLoading(false);
        });
    
        // Cleanup function for onAuthStateChanged
        return () => unsubscribe();
      }, []);
    

    const userInfo={
        user,
        UpdateProfile,
        donorUserLogin,
        donateUserRegistration,
        signout,
        name:'meghla'
    }
    return (
      <AuthContext.Provider value={userInfo}>
        {children}
      </AuthContext.Provider>
    )
  }
  