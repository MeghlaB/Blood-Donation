
import React, { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'

import auth from '../Firebase/Firebase_init'

const provider = new GoogleAuthProvider();
export const AuthContext = createContext(null)
export default function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Create user

    const creatUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }



    // UserLogin
    const SIgnIn = (email,password)=>{
       return signInWithEmailAndPassword(auth, email, password)
    }

    // Update Profile
    const UpdateProfile =(name,photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName:name, photoURl:photo
        })
    }

// Logout
const signout =()=>{
    return signOut(auth)
}

// google login 
const GoogleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  }


useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        // if(currentUser){
        //        // get token and store client
        //     const userInfo = {email:currentUser.email}

        //     axiosPublic.post('/jwt',userInfo)
        //     .then(res=>{
        //         if(res.data.token){
        //             localStorage.setItem('access-token' , res.data.token)
        //         }
        //     })
        // }
        // else{
        //     // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        //     localStorage.removeItem('access-token');
        // }
        console.log('Current User ==>', currentUser);
        setLoading(false);
    });

    // Cleanup function
    return () => {
        unSubscribe();
    };
}, []);


    const userInfo = {
        user,
        setUser,
        loading,
        SIgnIn,
        creatUser,
        signout,
        UpdateProfile ,
        GoogleLogin

    }


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}
