import React, { useState } from 'react';
import AxiosPublic from '../../../Components/Hooks/AxiosPublic';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

export default function AllDonationRequest() {
  const axiosSecure = AxiosSecure();
  const axiosPublic = AxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

 
  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['alldonarrequest'],
    queryFn: async () => {
      const res = await axiosPublic.get('/alldonarrequest');
      return res.data;
    },
  });

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
            Swal.fire('Deleted!', `${item.name} has been deleted.`, 'success');
            refetch(); // Refetch the data after deletion
          }
        } catch (error) {
          console.error('Error deleting the item:', error);
          Swal.fire('Error!', 'There was a problem deleting the item.', 'error');
        }
      }
    });
  };

  const totalPages = Math.ceil(requests.length / pageSize);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-9 container mx-auto">
        <h1 className="text-xl font-bold mb-4">All Blood Donation Requests</h1>
        {requests.length > 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((request) => (
                <tr key={request._id}>
                  <td className="border-b px-4 py-2">{request.recipientName}</td>
                  <td className="border-b px-4 py-2">{`${request.district}, ${request.upazila}`}</td>
                  <td className="border-b px-4 py-2">{request.donationDate}</td>
                  <td className="border-b px-4 py-2">{request.donationTime}</td>
                  <td className="border-b px-4 py-2">{request.bloodGroup}</td>
                  <td className="border-b px-4 py-2">{request.status}</td>
                  <td className="border-b px-4 py-2">
                <Link
                  to={`/dashboard/edit/${request._id}`}
                  className="btn btn-sm bg-blue-500 text-white rounded-md px-3 py-1"
                >
                   <FiEdit />
                </Link>
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No blood donation requests found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn btn-sm mx-1 ${
              currentPage === index + 1 ? 'bg-red-900 text-white hover:bg-red-900' : 'btn-outline'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
