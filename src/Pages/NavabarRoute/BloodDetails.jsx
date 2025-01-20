import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UseAuth from '../../Components/Hooks/UseAuth';
import AxiosPublic from '../../Components/Hooks/AxiosPublic';
import Modal from '../../Components/Modal/Modal';
import { LuCircleArrowLeft } from 'react-icons/lu';

export default function BloodDetails() {
    const { id } = useParams();
    const { user } = UseAuth();
    const axiosPublic = AxiosPublic();
    const [donation, setDonation] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosPublic.get(`/alldonarPageRequest/${id}`)
            .then((res) => {
                // console.log(res.data)
                setDonation(res.data);
            })

    }, []);

    const handleConfirmDonation = () => {

        const updatedDonation = {
            ...donation,
            status: 'inprogress',
            donorName: user.displayName,
            donorEmail: user.email,
        };

        setDonation(updatedDonation);
        axiosPublic
            .put(`/donation-requests/${id}`, updatedDonation)
            .then((res) => {
                // console.log(res.data)
                setShowModal(false);
            })
            .catch((err) => {
                setError('Failed to update donation status.');
                console.error(err);
            });
    };


    return (
        <div className='max-h-full mb-60 '>

            <div className="mt-32 container mx-auto  ">
                <Link to={'/requestDonation'} className='btn text-slate-600  '>
                    <LuCircleArrowLeft />
                    Back</Link>
                <h2 className="text-xl font-bold mb-6">Donation Request Details</h2>

                {error && <p className="text-red-500">{error}</p>}
                <div className="card bg-white shadow-md p-4 rounded-md">
                    <p><strong>Recipient Name:</strong> {donation?.recipientName || 'N/A'}</p>
                    <p><strong>Location:</strong> {`${donation?.district}, ${donation?.upazila}` || 'N/A'}</p>
                    <p><strong>Blood Group:</strong> {donation.bloodGroup || 'N/A'}</p>
                    <p><strong>Date:</strong> {donation.donationDate || 'N/A'}</p>
                    <p><strong>Time:</strong> {donation.donationTime || 'N/A'}</p>
                    <p>
                        <strong>Status:</strong>{' '}
                        <span
                            className={`badge ${donation.status === 'pending'
                                    ? 'bg-yellow-500 text-white'
                                    : donation.status === 'inprogress'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-400 text-white'
                                }`}
                        >
                            {donation.status || 'N/A'}
                        </span>
                    </p>


                    <button
                        className="btn bg-red-500 text-white mt-4"
                        onClick={() => setShowModal(true)}
                        disabled={donation.status !== 'pending' && donation.status !== undefined}
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
