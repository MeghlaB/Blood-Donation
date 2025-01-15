import React from 'react'
import UseAuth from './UseAuth'
import AxiosSecure from './AxiosSecure'
import { useQuery } from '@tanstack/react-query'

export default function UserAdmin() {
  const {user} =UseAuth()
  console.log(user)
  const axiosSecure = AxiosSecure()
const {data: isAdmin} = useQuery({
  queryKey:[user?.email ,'isAdmin'],
  queryFn:async ()=>{
    const result = await axiosSecure.get(`/users/admin/${user.email}`)
    console.log(result.data)
    return result.data?.admin
  }
})

  return[isAdmin]
}
