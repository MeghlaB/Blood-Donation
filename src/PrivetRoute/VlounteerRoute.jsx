import React from 'react'
import UseAuth from '../Components/Hooks/UseAuth'
import UserVolunteer from '../Components/Hooks/UserVolunteer'
import { Navigate, useLocation } from 'react-router-dom'

export default function VlounteerRoute({children}) {
    const {user,loading} = UseAuth()
    const [isvolunteer,isvolunteerLoading] =  UserVolunteer()
    const location =  useLocation()

    if(loading || isvolunteerLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }

if(user && isvolunteer){
    return children
}

  return (
    <Navigate to={'/'} state={{from: location.pathname }}></Navigate>
  )
}
