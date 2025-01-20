import React from 'react'
import UseAuth from '../../../Components/Hooks/UseAuth'
import Marquee from 'react-fast-marquee'
import { FaDonate, FaHospital, FaUsers } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import AxiosSecure from '../../../Components/Hooks/AxiosSecure'
import Funding from '../../NavabarRoute/Funding'

export default function Volunteer() {
  const {user} =UseAuth()
const axiosSecure =AxiosSecure()
  const {data: stats} =useQuery({
    queryKey:['stats'],
    queryFn: async()=>{
      const res = await axiosSecure.get('/stats')
      // console.log(res.data)
      return res.data
    }
  })


  return (
    <div className=' container mx-auto mt-3'>
        <Marquee>
        <div className="p-6 mt-6 text-center bg-base-200 rounded-md w-full">
          {user?.displayName ? (
            <h2 className="text-2xl font-bold px-96">
              Welcome, <span className="text-red-900">{user.displayName}</span>!
            </h2>
          ) : (
            <h2 className="text-2xl font-bold">Welcome, Donor!</h2>
          )}
          <p className="text-gray-600 mt-2">
            Thank you for being a part of our donor community.
          </p>
        </div>
      </Marquee>
          {/* Featured Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {/* Total Donors Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div className="text-center ">
            <FaUsers className="text-4xl text-blue-500" />
           <div>
           <h3 className="mt-4 text-xl font-semibold">Total Donors</h3>
           <p className="text-2xl font-bold">{stats?.user}</p>
           </div>
          </div>
        </div>

        {/* Total Funds Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div className="text-center ">
            <FaDonate className="text-4xl text-green-500" />
            <div>
            <h3 className="mt-4 text-xl font-semibold">Total Funds</h3>
            <p className="text-2xl font-bold">${stats?.funding}</p>
            </div>
          </div>
        </div>

        {/* Total Blood Donation Requests Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div className="text-center  ">
            <FaHospital className="text-4xl text-red-500" />
           <div>
           <h3 className="mt-4 text-xl font-semibold">Total Blood Donation Requests</h3>
           <p className="text-2xl font-bold">{stats?.donarRequset}</p>
           </div>
          </div>
        </div>
      </div>
      
      

    </div>
  )
}
