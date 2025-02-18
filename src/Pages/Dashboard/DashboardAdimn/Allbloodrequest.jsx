import React, { useEffect, useState } from 'react';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import AxiosPublic from '../../../Components/Hooks/AxiosPublic';
import { FiEdit } from 'react-icons/fi';

export default function AllBloodRequest() {
  const axiosSecure = AxiosSecure();
  const axiosPublic = AxiosPublic();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ['AllDonorRequest'],
    queryFn: async () => {
      const res = await axiosSecure.get('/AlldonerRequest');
      return res.data;
    },
  });

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(
        requests.filter((request) => request.status === statusFilter)
      );
    }
  }, [statusFilter, requests]);

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
            Swal.fire('Deleted!', `${item.recipientName} has been deleted.`, 'success');
            refetch();
          }
        } catch (error) {
          Swal.fire('Error!', 'Unable to delete the item.', 'error');
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
          refetch();
          Swal.fire('Success', `Status updated to ${selectedStatus}.`, 'success');
          setSelectedStatus('');
          setSelectedUser(null);
        }
      })
      .catch((err) => {
        Swal.fire('Error', err.response?.data?.message || 'Failed to update status.', 'error');
      });
  };

  const totalPages = Math.ceil(filteredRequests.length / pageSize);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mx-auto mt-9 px-4 sm:px-6 lg:px-8">
  <h1 className="text-xl font-bold mb-4 text-center">All Blood Donation Requests</h1>

  {/* Filter by Status */}
  <div className="mb-4">
    <label htmlFor="statusFilter" className="mr-2">Filter by Status</label>
    <select
      id="statusFilter"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="border px-3 py-2 rounded-md w-full sm:w-auto"
    >
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="inprogress">In Progress</option>
      <option value="done">Done</option>
      <option value="canceled">Canceled</option>
    </select>
  </div>

  {isLoading ? (
    <p>Loading...</p>
  ) : filteredRequests.length > 0 ? (
    <div className="overflow-x-auto ">
      <table className="table-auto text-center w-full border-collapse border border-gray-300 overflow-hidden ">
        <thead>
          <tr className="bg-gray-500">
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
              <td className="border-b px-4 py-2">
                {request.status}
                {request.status === 'inprogress' && (
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-sm">
                      <MdOutlineArrowDropDown />
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box -top-10 w-52 p-2 shadow"
                    >
                      <select
                        id="status"
                        className="select select-bordered w-full max-w-xs"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option disabled value="">Select a Status</option>
                        <option value="canceled">Canceled</option>
                        <option value="done">Done</option>
                        <option value="inprogress">In Progress</option>
                      </select>
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            setSelectedUser(request);
                            handlestausChange();
                          }}
                          className="btn bg-red-900 text-white hover:bg-red-700 w-full"
                        >
                          Submit
                        </button>
                      </div>
                    </ul>
                  </div>
                )}
              </td>
              <td className="border-b px-4 py-2">
                <Link
                  to={`/dashboard/edit/${request._id}`}
                  className="btn btn-sm bg-blue-500 text-white rounded-md px-3 py-1"
                >
                  <FiEdit />
                </Link>
              </td>
              <td className="border-b px-4 py-2 text-center">
                <button
                  onClick={() => handleMenuDelete(request)}
                  className="flex items-center justify-center rounded-full bg-red-500 px-4 py-4 font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700"
                >
                  <FaTrash />
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
    </div>
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
