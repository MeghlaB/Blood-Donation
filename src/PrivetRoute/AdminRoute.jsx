import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import UserAdmin from '../Components/Hooks/UserAdmin'
import UseAuth from '../Components/Hooks/UseAuth'

export default function AdminRoute({children}) {
    const {user,loading} = UseAuth()
    const [isAdmin,isAdminLoading] =  UserAdmin()
    const location =  useLocation()

    if(loading || isAdminLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }

if(user && isAdmin){
    return children
}

  return (
    <Navigate to={'/'} state={{from: location.pathname }}></Navigate>
  )
}
