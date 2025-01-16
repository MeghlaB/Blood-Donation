import React, { useEffect, useState } from 'react';
import UseAuth from '../../Components/Hooks/UseAuth';
import AxiosSecure from '../../Components/Hooks/AxiosSecure';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import Swal from 'sweetalert2';

export default function DashboardHome() {
  const { user } = UseAuth();
  const axiosSecure = AxiosSecure();
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/donation-requests/${user?.email}`);
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

  return (
    <div>
      <Marquee>
        <div className="p-6 mt-14 text-center bg-base-200 rounded-md w-full">
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
                <th className="border-b px-4 py-2">Blood Group</th>
                <th className="border-b px-4 py-2">Status</th>
                <th className="border-b px-4 py-2">Edit</th>
                <th className="border-b px-4 py-2">Delete</th>
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
                  <td className="border-b px-4 py-2">{request.bloodGroup}</td>
                  <td className="border-b px-4 py-2">{request.status}</td>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="mr-2 h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
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
