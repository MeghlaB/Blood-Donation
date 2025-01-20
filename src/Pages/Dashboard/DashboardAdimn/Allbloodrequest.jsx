import React, { useState } from 'react';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

export default function AllBloodRequest() {
  const axiosSecure = AxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;


  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ['AllDonorRequest'],
    queryFn: async () => {
      const res = await axiosSecure.get('/AlldonerRequest');
      return res.data;
    },
  });

  // Handle delete functionality
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
            refetch(); // Refresh the data
            Swal.fire('Deleted!', `${item.recipientName} has been deleted.`, 'success');
          }
        } catch (error) {
          console.error('Error deleting the item:', error);
          Swal.fire('Error!', 'There was a problem deleting the item.', 'error');
        }
      }
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(requests.length / pageSize);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mx-auto mt-9">
      <h1 className="text-xl font-bold mb-4">All Blood Donation Requests</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : requests.length > 0 ? (
        <table className="table-auto text-center w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-4 py-2">Recipient Name</th>
              <th className="border-b px-4 py-2">Location</th>
              <th className="border-b px-4 py-2">Date</th>
              <th className="border-b px-4 py-2">Time</th>
              <th className="border-b px-4 py-2">Blood Group</th>
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Edit</th>
              <th className="border-b px-4 py-2">Delete</th>
              <th className="border-b px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.map((request) => (
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
                <td className="border-b px-4 py-2">
                  <Link
                    to={`/details/${request._id}`}
                    className="text-sky-700 underline"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No blood donation requests found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn btn-sm mx-1 ${
              currentPage === index + 1
                ? 'bg-red-900 text-white hover:bg-red-900'
                : 'btn-outline'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
