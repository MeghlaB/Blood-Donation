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


   const handleMenuDelete = async (item) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosSecure.delete(`/donation/${item._id}`);
            if (res.data.deletedCount > 0) {
              setRequests((prev) => prev.filter((req) => req._id !== item._id));
              Swal.fire('Deleted!', `${item.name} has been deleted.`, 'success');
            }
          } catch (error) {
            console.error('Error deleting the item:', error);
            Swal.fire('Error!', 'There was a problem deleting the item.', 'error');
          }
        }
      });
    };

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
            <th className="border-b px-4 py-2">Edit</th>
            <th className="border-b px-4 py-2">Delate</th>
         
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
               <td className="border-b px-4 py-2">
                  <Link
                   to={`/dashboard/edit/${request._id}`}
                   className="btn btn-sm bg-blue-500 text-white rounded-md px-3 py-1"
                  >
                  Edit
                  </Link>
                 </td>
                <td className="border-b px-4 py-2 text-center">
                  <button
                  onClick={() => handleMenuDelete(request)}
                  className="flex items-center justify-center rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700"
                  >
                  <FaTrash />
                  Delete
                  </button>
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
