import React from 'react'
import UseAuth from './UseAuth'
import AxiosSecure from './AxiosSecure'
import { useQuery } from '@tanstack/react-query'

export default function UserVolunteer() {
  const {user} =UseAuth()

  const axiosSecure = AxiosSecure()
const {data: isvolunteer ,isPending: isvolunteerLoading} = useQuery({
  queryKey:[user?.email ,'isvlounteer'],
  queryFn:async ()=>{
    const result = await axiosSecure.get(`/users/volunteer/${user.email}`)

    return result.data?.volunteer
  }
})

  return[isvolunteer, isvolunteerLoading]
}
