import React, { useEffect, useState } from 'react';
import UseAuth from '../../Components/Hooks/UseAuth';
import AxiosPublic from '../../Components/Hooks/AxiosPublic';
import { Link } from 'react-router-dom';
import { LuCircleArrowLeft } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';

export default function DonationRequest() {
    const { user } = UseAuth();
    const axiosPublic = AxiosPublic();
    const {data:requests,isLoading} =useQuery({
        queryKey:['alldonar'],
        queryFn:async ()=>{
            const res = await axiosPublic.get('/alldonar')
            // console.log(res.data)
            return res.data
        }
    })


    return (
        <div className="mt-20 ">
            <Link to={'/'} className='btn text-slate-600 mb-5 mx-6  '>
                    <LuCircleArrowLeft />
                    Back</Link>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading? (
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
                               <button className="btn bg-red-900 text-white hover:bg-red-950">View </button>
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
