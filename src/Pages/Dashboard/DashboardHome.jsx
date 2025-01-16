import React, { useEffect, useState } from 'react';
import UseAuth from '../../Components/Hooks/UseAuth';
import AxiosSecure from '../../Components/Hooks/AxiosSecure';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';

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
        const lastThreeRequests = allRequests.slice(-3); // Get the last 3 entries
        setRecentRequests(lastThreeRequests);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRequests();
  }, [user?.email, axiosSecure]);

  return (
    <div>
      <Marquee>
     <div className="p-6 mt-14 text-center  bg-base-200 rounded-md w-full">
    {user?.displayName ? (
      <h2 className="text-2xl font-bold px-96">
        Welcome, <span className="text-red-900  ">{user.displayName}</span>!
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
        <p className="text-center mt-4">Loading recent donations...</p>
      ) : recentRequests.length > 0 ? (
        <table className="min-w-full table-auto border-collapse mt-4">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Recipient Name</th>
              <th className="border-b px-4 py-2">Location</th>
              <th className="border-b px-4 py-2">Date</th>
              <th className="border-b px-4 py-2">Blood Group</th>
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.map((request) => (
              <tr key={request._id}>
                <td className="border-b px-4 py-2">{request.recipientName}</td>
                <td className="border-b px-4 py-2">
                  {`${request?.district}, ${request?.upazila}`}
                </td>
                <td className="border-b px-4 py-2">{request.donationDate}</td>
                <td className="border-b px-4 py-2">{request.bloodGroup}</td>
                <td className="border-b px-4 py-2">{request.status}</td>
                <Link to={`/dashboard/edit/${request._id}`} className='btn btn-sm flex items-center'><td>Edit</td></Link>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4">No recent donations found.</p>
      )}
    </div>
    </div>
  );
}