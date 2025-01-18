import React, { useEffect, useState } from 'react'
import AxiosSecure from '../../../Components/Hooks/AxiosSecure'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function AllBloodRequest() {
  const [requests, setRequests] = useState([])
  const axiosSecure = AxiosSecure()

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await axiosSecure.get('/AlldonerRequest') 
        setRequests(res.data) 
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching all donor requests:', error) 
      }
    }
    fetchAllRequests()
  }, [axiosSecure])

  return (
    <div className='mt-16'>
      <h1 className='text-xl font-bold mb-4'>All Blood Donation Requests</h1>
      {requests.length > 0 ? (
        <table className='table-auto text-center w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
            <th className="border-b px-4 py-2">Recipient Name</th>
            <th className="border-b px-4 py-2">Location</th>
            <th className="border-b px-4 py-2">Date</th>
            <th className="border-b px-4 py-2">Time</th>
            <th className="border-b px-4 py-2">Blood Group</th>
            <th className="border-b px-4 py-2">Status</th>
         
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id}>
              <td className="border-b px-4 py-2">{request.recipientName}</td>
              <td className="border-b px-4 py-2">
                {`${request.district}, ${request.upazila}`}
              </td>
              <td className="border-b px-4 py-2">{request.donationDate}</td>
              <td className="border-b px-4 py-2">{request.donationTime}</td>
              <td className="border-b px-4 py-2">{request.bloodGroup}</td>
              <td className="border-b px-4 py-2">{request.status}</td>
            
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
