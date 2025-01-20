import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UseAuth from '../../Components/Hooks/UseAuth';
import AxiosPublic from '../../Components/Hooks/AxiosPublic';
import Modal from '../../Components/Modal/Modal';
import { LuCircleArrowLeft } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';

export default function BloodDetails() {
    const { id } = useParams();
    const { user } = UseAuth();
    const axiosPublic = AxiosPublic();
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    const { data: donations ,refetch} = useQuery({
        queryKey: ['alldonarPageRequest',id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/alldonarPageRequest/${id}`)
          
            return res.data
        }
    })

    const handleConfirmDonation = () => {
        const updatedDonation = {
            ...donations,
            status: 'inprogress',
            donorName: user.displayName,
            donorEmail: user.email,
        };
      
        axiosPublic
            .put(`/donation-requests/${id}`, updatedDonation)
            .then(() => {
                refetch()
                // console.log(res.data)
                setShowModal(false);
                navigate('/requestDonation')
            })
            .catch((err) => {
                setError('Failed to update donation status.');
                console.error(err);
            });
    };


    return (
        <div className='m-24 '>
            <Link to={'/requestDonation'} className='btn text-slate-600  '>
                <LuCircleArrowLeft />
                Back</Link>
            <div className="mt-10 w-1/2 mx-auto  ">

                <h2 className="text-xl font-bold mb-6">Donation Request <span className='text-red-950'>Details:</span></h2>

                {error && <p className="text-red-500">{error}</p>}
                <div className="card bg-white shadow-md p-4 rounded-md">
                    <p><strong>Recipient Name:</strong> {donations?.recipientName
                        || 'N/A'}</p>
                    <p><strong>Location:</strong> {`${donations?.district}, ${donations?.upazila}` || 'N/A'}</p>
                    <p><strong>Blood Group:</strong> {donations?.bloodGroup || 'N/A'}</p>
                    <p><strong>Date:</strong> {donations?.donationDate || 'N/A'}</p>
                    <p><strong>Time:</strong> {donations?.donationTime || 'N/A'}</p>
                    <p><strong>Request Message:</strong> {donations?.requestMessage || 'N/A'}</p>
                    <p>
                        <strong>Status:</strong>{' '}
                        <span
                            className={`badge ${donations?.status === 'pending'
                                ? 'bg-yellow-500 text-white'
                                : donations?.status === 'inprogress'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-400 text-white'
                                }`}
                        >
                            {donations?.status || 'N/A'}
                        </span>
                    </p>


                    <button
                        className="btn bg-red-900 hover:bg-red-950 text-white mt-4"
                        onClick={() => setShowModal(true)}
                        disabled={donations?.status !== 'pending' && donations?.status !== undefined}
                    >
                        Donate
                    </button>
                </div>

                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <form className="p-4">
                            <h3 className="text-lg font-bold mb-4">Confirm Donation</h3>
                            <div className="mb-4">
                                <label className="block font-semibold">Donor Name</label>
                                <input
                                    type="text"
                                    value={user.displayName}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold">Donor Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <button
                                type="button"
                                className="btn bg-green-500 text-white"
                                onClick={handleConfirmDonation}
                            >
                                Confirm Donation
                            </button>
                        </form>
                    </Modal>
                )}
            </div>
        </div>
    );
}
