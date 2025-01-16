import React, { useState, useEffect } from 'react';
import AxiosSecure from '../../Components/Hooks/AxiosSecure';
import UseAuth from '../../Components/Hooks/UseAuth';

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
        console.error("Error fetching donation requests:", error);
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email, axiosSecure]);


  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(request => request.status === statusFilter));
    }
  }, [statusFilter, requests]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  return (
    <div className="mt-48 p-6">
      <h1 className="text-xl font-semibold mb-4">My Donation Requests</h1>
      
      {/* Filter by Status */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filter by Status</label>
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
            <th className="border-b px-4 py-2">Hospital Name</th>
            <th className="border-b px-4 py-2">Donation Date</th>
            <th className="border-b px-4 py-2">Status</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request) => (
            <tr key={request._id}>
              <td className="border-b px-4 py-2">{request.recipientName}</td>
              <td className="border-b px-4 py-2">{request.hospitalName}</td>
              <td className="border-b px-4 py-2">{request.donationDate}</td>
              <td className="border-b px-4 py-2">{request.status}</td>
              <td className="border-b px-4 py-2">
                {/* Actions (like View Details or Edit) */}
                <button className="text-blue-500 hover:underline">View</button>
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
