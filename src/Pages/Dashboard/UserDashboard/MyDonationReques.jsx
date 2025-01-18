import React, { useState, useEffect } from 'react';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import UseAuth from '../../../Components/Hooks/UseAuth';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function MyDonationRequests() {
  const { user } = UseAuth();
  const axiosSecure = AxiosSecure();

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5); 

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosSecure.get(`/donation-requests/${user?.email}`);
        setRequests(response.data);
        setFilteredRequests(response.data);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email, axiosSecure]);

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

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter((request) => request.status === statusFilter));
    }
  }, [statusFilter, requests]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  return (
    <div className="mt-24 p-6">
      <h1 className="text-xl font-semibold mb-4">My Donation Requests:{requests.length}</h1>

      {/* Filter by Status */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Donation Requests Table */}
      <table className="min-w-full table-auto border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Recipient Name</th>
            <th className="border-b px-4 py-2">Location</th>
            <th className="border-b px-4 py-2">Date</th>
            <th className="border-b px-4 py-2">Time</th>
            <th className="border-b px-4 py-2">Blood Group</th>
            <th className="border-b px-4 py-2">Status</th>
            <th className="border-b px-4 py-2">Edit</th>
            <th className="border-b px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request) => (
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

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md mx-2"
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(filteredRequests.length / requestsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 border rounded-md mx-2 ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredRequests.length / requestsPerPage)}
          className="px-4 py-2 border rounded-md mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
