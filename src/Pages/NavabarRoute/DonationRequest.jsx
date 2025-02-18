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

    const { data: requests, isLoading } = useQuery({
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
    const getCardBgClass = () => (theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800');
    const getTextClass = () => (theme === 'dark' ? 'text-gray-200' : 'text-gray-700');
    const getSubTextClass = () => (theme === 'dark' ? 'text-gray-400' : 'text-gray-600');

    return (
        <div className={`min-h-screen ${getBgClass()}`}>
            <Link to={'/'} className={`btn mb-5 mx-6 ${getTextClass()}`}>
                <LuCircleArrowLeft />
                Back
            </Link>
            <div
                className="container mt-12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                data-aos="zoom-out"
            >
                {isLoading ? (
                    <p className={`text-center ${getSubTextClass()}`}>Loading...</p>
                ) : requests.length > 0 ? (
                    requests.map((request) => (
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
