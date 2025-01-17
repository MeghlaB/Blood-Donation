import React from 'react'
import UseAuth from './UseAuth'
import AxiosSecure from './AxiosSecure'
import { useQuery } from '@tanstack/react-query'

export default function UserVolunteer() {
  const {user} =UseAuth()
  // console.log(user)
  const axiosSecure = AxiosSecure()
const {data: isvolunteer ,isPending: isvolunteerLoading} = useQuery({
  queryKey:[user?.email ,'isvlounteer'],
  queryFn:async ()=>{
    const result = await axiosSecure.get(`/users/volunteer/${user.email}`)
    // console.log(result.data)
    return result.data?.volunteer
  }
})

  return[isvolunteer, isvolunteerLoading]
}
