import React, { useEffect, useState } from 'react';
import UseAuth from '../../Components/Hooks/UseAuth';
import AxiosPublic from '../../Components/Hooks/AxiosPublic';
import { Link } from 'react-router-dom';

export default function DonationRequest() {
    const { user } = UseAuth();
    const axiosPublic = AxiosPublic();
    const [requests, setRequests] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {

        axiosPublic
            .get('/alldonarrequest')
            .then((res) => {
                console.log(res.data);
                const pendingRequests = res.data.filter(
                    (request) => request.status === 'pending'
                );
                setRequests(pendingRequests); 
            })
            .catch((error) => {
                console.error('Error fetching donation requests:', error);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, [axiosPublic]);



    return (
        <div className="mt-20 min-h-screen">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : requests.length > 0 ? (
                    requests.map((request) => (
                        <div
                            key={request._id}
                            className="p-4 border rounded shadow-sm bg-white"
                        >
                            <h3 className="text-lg font-semibold">Name:{request?.recipientName
                            }</h3>
                            <p>Location: {`${request.district}, ${request.upazila}`}</p>
                            <p>Blood Group: {request.bloodGroup}</p>
                            <p>Date: {request.donationDate}</p>
                            <p>Time: {request.donationTime}</p>
                            <div className="card-actions justify-end">
                               <Link to={`/details/${request._id}`}>
                               <button className="btn bg-red-400 text-white hover:bg-red-900">View </button>
                               </Link>
                            </div>
                        </div>

                    ))
                ) : (
                    <p className="text-center text-gray-500">No pending requests found.</p>
                )}
            </div>
        </div>
    );
}
