import React, { useEffect, useState } from 'react'
import AxiosSecure from '../../../Components/Hooks/AxiosSecure'

export default function AllBloodRequest() {
  const [requests, setRequests] = useState([]) // রিকোয়েস্ট স্টোর করার জন্য state
  const axiosSecure = AxiosSecure()

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await axiosSecure.get('/AlldonerRequest') // অ্যাসিঙ্ক্রোনাস ডেটা ফেচ
        setRequests(res.data) // ডেটা state-এ সেট করা
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching all donor requests:', error) // এরর হ্যান্ডলিং
      }
    }
    fetchAllRequests()
  }, [axiosSecure])

  return (
    <div className='mt-10'>
      <h1 className='text-xl font-bold mb-4'>All Blood Donation Requests</h1>
      {requests.length > 0 ? (
        <table className='table-auto w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border px-4 py-2'>Request ID</th>
              <th className='border px-4 py-2'>Donor Name</th>
              <th className='border px-4 py-2'>Blood Group</th>
              <th className='border px-4 py-2'>District</th>
              <th className='border px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td className='border px-4 py-2'>{request._id}</td>
                <td className='border px-4 py-2'>{request.requesterName}</td>
                <td className='border px-4 py-2'>{request.bloodGroup}</td>
                <td className='border px-4 py-2'>{request.district}</td>
                <td className='border px-4 py-2'>
                  <button className='bg-blue-500 text-white px-3 py-1 rounded'>Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No blood donation requests found.</p>
      )}
    </div>
  )
}
