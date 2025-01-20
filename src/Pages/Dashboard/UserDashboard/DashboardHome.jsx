import React, { useEffect, useState } from 'react';


import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import Swal from 'sweetalert2';
import UseAuth from '../../../Components/Hooks/UseAuth';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { FaTrash } from 'react-icons/fa';
import AxiosPublic from '../../../Components/Hooks/AxiosPublic';
import { BsThreeDots } from 'react-icons/bs';
import { MdOutlineArrowDropDown } from 'react-icons/md';

export default function DashboardHome() {
  const { user } = UseAuth();
  const axiosSecure = AxiosSecure();
  const axiosPublic = AxiosPublic()
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/requests/${user?.email}`);
        // console.log(response.data)
        const allRequests = response.data;
        const lastThreeRequests = allRequests.slice(-3);
        setRecentRequests(lastThreeRequests);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRequests();
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
            setRecentRequests((prev) => prev.filter((req) => req._id !== item._id));
            Swal.fire('Deleted!', `${item.name} has been deleted.`, 'success');
          }
        } catch (error) {
          console.error('Error deleting the item:', error);
          Swal.fire('Error!', 'There was a problem deleting the item.', 'error');
        }
      }
    });
  };

  const handleStatusChange = () => {
    if (!selectedUser || !selectedStatus) {
      Swal.fire('Error', 'Please select a user and a status.', 'error');
      return;
    }
  
    axiosPublic.put(`/alldonar/status/${selectedUser._id}`, { status: selectedStatus })
      .then((res) => {
        if (res?.data?.message === 'Status updated successfully') {
          Swal.fire('Success', `Status updated to ${selectedStatus}.`, 'success');
          setRecentRequests(prevRequests =>
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
  
  return (
    <div>
      <Marquee>
        <div className="p-6 mt-8 text-center bg-base-200 rounded-md w-full">
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

      <div>
        <h1 className="text-2xl font-bold text-center mt-6">Recent Donations</h1>
        {loading ? (
          <div className="flex justify-center items-center mt-6">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"></div>
            <p className="ml-4 text-red-500">Loading recent donations...</p>
          </div>
        ) : recentRequests.length > 0 ? (
          <table className="min-w-full table-auto border-collapse mt-4 mb-8">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Recipient Name</th>
                <th className="border-b px-4 py-2">Location</th>
                <th className="border-b px-4 py-2">Date</th>
                <th className="border-b px-4 py-2">Time</th>
                <th className="border-b px-4 py-2">Blood Group</th>
               
                <th className="border-b px-4 py-2">Status</th>
                <th className="border-b px-4 py-2">Donar Infromation</th>
                <th className="border-b px-4 py-2">Edit</th>
                <th className="border-b px-4 py-2">Delete</th>
                <th className="border-b px-4 py-2">View Details</th>

              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request) => (
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
                    {request.status === 'inprogress' &&
                     <div className="mt-2">
                     <p className="text-sm font-semibold">Donor Name: {request.donorName|| 'N/A'}</p>
                     <p className="text-sm">Email: {request.donorEmail|| 'N/A'}</p>
                   </div>
                    }
                  </td>
                  <td className="border-b px-4 py-2">
                    <Link to={`/dashboard/edit/${request._id}`} className="btn btn-sm">
                      Edit
                    </Link>
                  </td>
                  <td className="border-b px-4 py-2 text-center">
                    <button
                      onClick={() => handleMenuDelete(request)}
                      className="flex items-center justify-center rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700"
                    >
                      <FaTrash></FaTrash>
                      Delete
                    </button>
                  </td>
                 <Link to={`/details/${request._id}`}> <td className="pt-9 text-sky-700 underline ">Details</td></Link>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-4">No recent donations found.</p>
        )}
      </div>
      <div className="space-y-5">
        <Link to={'/dashboard/my-donation-requests'}>
          <button className="btn bg-red-950 text-white">View All</button>
        </Link>
      </div>
    </div>
  );
}
