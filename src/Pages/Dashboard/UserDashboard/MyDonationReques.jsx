import React, { useState, useEffect } from 'react';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import UseAuth from '../../../Components/Hooks/UseAuth';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { BsThreeDots } from 'react-icons/bs';
import AxiosPublic from '../../../Components/Hooks/AxiosPublic';
import { MdOutlineArrowDropDown } from 'react-icons/md';

export default function MyDonationRequests() {
  const { user } = UseAuth();
  const axiosPublic = AxiosPublic()
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosPublic.get(`/requests/${user?.email}`);
        setRequests(response.data);
        setFilteredRequests(response.data);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email]);

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


  const handlestausChange = () => {
    if (!selectedUser || !selectedStatus) {
      Swal.fire('Error', 'Please select a user and a status.', 'error');
      return;
    }

    axiosPublic.put(`/alldonar/status/${selectedUser._id}`, { status: selectedStatus })
      .then((res) => {
        if (res?.data?.message === 'Status updated successfully') {
          Swal.fire('Success', `Status updated to ${selectedStatus}.`, 'success');
          setRequests(prevRequests =>
            prevRequests.map((request) =>
              request._id === selectedUser._id ? { ...request, status: selectedStatus } : request
            )
          );
          setSelectedStatus('');
          setSelectedUser(null);
        }
      })
      .catch((err) => {
        Swal.fire('Error', err.response?.data?.message || 'Failed to update status.', 'error');
      });
  };






  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter((request) => request.status === statusFilter));
    }
  }, [statusFilter, requests]);

  const totalPages = Math.ceil(filteredRequests.length / pageSize);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  return (
    <div className="mt-9 p-6">
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
          {paginatedRequests.map((request) => (
            <tr key={request._id}>
              <td className="border-b px-4 py-2">{request.recipientName}</td>
              <td className="border-b px-4 py-2">
                {`${request.district}, ${request.upazila}`}
              </td>
              <td className="border-b px-4 py-2">{request.donationDate}</td>
              <td className="border-b px-4 py-2">{request.donationTime}</td>
              <td className="border-b px-4 py-2">{request.bloodGroup}</td>
             <td className="border-b px-4 py-2">{request.status}
                                 <div className="dropdown dropdown-end">
                                   <label tabIndex={0} className="btn btn-ghost btn-sm">
                                   <MdOutlineArrowDropDown/>
                                   </label>
                                   <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box -top-10 w-52 p-2 shadow">
                                     <select
                                       id="status"
                                       className="select select-bordered w-full max-w-xs"
                                       value={selectedStatus}
                                       onChange={(e) => setSelectedStatus(e.target.value)}
                                     >
                                       <option disabled>Select a Status</option>
                                       {request.status === 'inprogress' && (
                                         <>
                                           <option value="canceled">Canceled</option>
                                           <option value="done">Done</option>
                                           <option value="progress">Progress</option>
                                         </>
                                       )}
                                     </select>
                                     <div className="mt-4">
                                       <button
                                         onClick={() => {
                                           setSelectedUser(request);
                                           handleStatusChange();
                                         }}
                                         className="btn bg-red-900 text-white hover:bg-red-900 w-full"
                                       >
                                         Submit
                                       </button>
                                     </div>
                                   </ul>
                                 </div>
             
                               </td>
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
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn btn-sm mx-1 ${currentPage === index + 1 ? 'bg-red-900 text-white hover:bg-red-900' : 'btn-outline'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
