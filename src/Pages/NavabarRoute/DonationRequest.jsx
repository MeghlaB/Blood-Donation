import React, { useContext, useEffect, useState } from 'react';
import UseAuth from '../../Components/Hooks/UseAuth';
import AxiosPublic from '../../Components/Hooks/AxiosPublic';
import { Link } from 'react-router-dom';
import { LuCircleArrowLeft } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { ThemeContext } from '../../Context/ThemeProvider';

export default function DonationRequest() {
    const { user } = UseAuth();
    const axiosPublic = AxiosPublic();
    const { theme } = useContext(ThemeContext);
    const [sortOrder, setSortOrder] = useState('asc'); 

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['alldonars'],
        queryFn: async () => {
            const res = await axiosPublic.get('/alldonars');
            return res.data;
        }
    });

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const getBgClass = () => (theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900');
    const getCardBgClass = () => (theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-base-200 text-gray-800');
    const getTextClass = () => (theme === 'dark' ? 'text-gray-200' : 'text-gray-700');
    const getSubTextClass = () => (theme === 'dark' ? 'text-gray-400' : 'text-gray-600');

 
    const sortedRequests = [...requests].sort((a, b) => {
        const dateA = new Date(a.donationDate);
        const dateB = new Date(b.donationDate);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className={`min-h-screen pt-24 ${getBgClass()}`}>
            {/* <Link to={'/'} className={`btn mb-5 mx-6 ${getTextClass()}`}>
                <LuCircleArrowLeft />
                Back
            </Link> */}

            {/* 🔘 Sort Button */}
            <div className="flex justify-end px-6">
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="btn bg-blue-600 text-white hover:bg-blue-800"
                >
                    Sort By Date ({sortOrder === 'asc' ? 'Oldest' : 'Newest'})
                </button>
            </div>

            <div className="container mt-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-aos="zoom-out">
                {isLoading ? (
                    <p className={`text-center ${getSubTextClass()}`}>Loading...</p>
                ) : sortedRequests.length > 0 ? (
                    sortedRequests.map((request) => (
                        <div key={request._id} className={`p-4 border rounded shadow-sm ${getCardBgClass()}`}>
                            <h3 className={`text-lg font-semibold ${getTextClass()}`}>
                                Name: {request?.recipientName}
                            </h3>
                            <p className={getSubTextClass()}>Location: {`${request.district}, ${request.upazila}`}</p>
                            <p className={getSubTextClass()}>Blood Group: {request.bloodGroup}</p>
                            <p className={getSubTextClass()}>Date: {request.donationDate}</p>
                            <p className={getSubTextClass()}>Time: {request.donationTime}</p>

                            <div className="card-actions justify-end">
                                <Link to={`/details/${request?._id}`}>
                                    <button className="btn bg-red-900 text-white hover:bg-red-950">View</button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={`text-center ${getSubTextClass()}`}>No pending requests found.</p>
                )}
            </div>
        </div>
    );
}
