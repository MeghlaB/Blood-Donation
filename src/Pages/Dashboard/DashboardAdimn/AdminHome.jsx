import React from 'react'
import UseAuth from '../../../Components/Hooks/UseAuth'
import Marquee from 'react-fast-marquee'

export default function AdminHome() {
  const {user} =UseAuth()
  return (
    <div className=' mt-3'>
        <Marquee>
        <div className="p-6 mt-14 text-center bg-base-200 rounded-md w-full">
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
      
      

    </div>
  )
}
