import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import UseAuth from '../../../Components/Hooks/UseAuth';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';

const CreateDonationPage = () => {
    const { user } = UseAuth();
    const axiosSecure = AxiosSecure();
    const [recipientName, setRecipientName] = useState('');
    const [districts, setDistricts] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const [donationTime, setDonationTime] = useState('');
    const [requestMessage, setRequestMessage] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
const navigate = useNavigate()
    useEffect(() => {
        if (user?.status === 'blocked') {
            setIsBlocked(true);
        }
    }, [user]);

    useEffect(() => {
        axios
            .get('/distric.json')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setDistricts(response.data);
                } else {
                    console.error('Invalid district data format');
                }
            })
            .catch((error) => {
                console.error('Error fetching districts data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to load district data. Please try again later.',
                });
            });
    }, []);

    const handleDistrictChange = (event) => {
        const selected = event.target.value;
        setSelectedDistrict(selected);
        const foundDistrict = districts.find((d) => d.district === selected);
        setFilteredUpazilas(foundDistrict ? foundDistrict.upazilas : []);
        setSelectedUpazila(''); // Clear upazila field when district changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donationRequest = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName,
            district: selectedDistrict,
            upazila: selectedUpazila,
            hospitalName,
            fullAddress,
            bloodGroup,
            donationDate,
            donationTime,
            requestMessage,
            status: 'pending',
        };
    console.log(donationRequest)
        try {
            const res = await axiosSecure.post('/donation-requests', donationRequest);
            console.log(res.data)
            if (res.data.insertedId ) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Donation request created successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Reset form
                setRecipientName('');
                setSelectedDistrict('');
                setSelectedUpazila('');
                setHospitalName('');
                setFullAddress('');
                setBloodGroup('');
                setDonationDate('');
                setDonationTime('');
                setRequestMessage('');
            }
           
        } catch (error) {
            console.error('Error creating donation request:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
            });
        }
    };

    return (
        <section className="p-6 mt-20 bg-gray-100 text-gray-900">
            <form onSubmit={handleSubmit} className="container mx-auto space-y-6">
                <fieldset className="p-6 rounded-md shadow-sm bg-white">
                    <div className="grid grid-cols-6 gap-4">
                        {/* Requester Name */}
                        <div className="col-span-3">
                            <label htmlFor="requesterName" className="block text-sm">
                                Requester Name*
                            </label>
                            <input
                                id="requesterName"
                                type="text"
                                value={user?.displayName}
                                readOnly
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            />
                        </div>
                        {/* Requester Email */}
                        <div className="col-span-3">
                            <label htmlFor="requesterEmail" className="block text-sm">
                                Requester Email*
                            </label>
                            <input
                                id="requesterEmail"
                                type="email"
                                value={user?.email}
                                readOnly
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            />
                        </div>
                        {/* Recipient Name */}
                        <div className="col-span-3">
                            <label htmlFor="recipientName" className="block text-sm">
                                Recipient Name
                            </label>
                            <input
                                id="recipientName"
                                type="text"
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            />
                        </div>
                        {/* District */}
                        <div className="col-span-3">
                            <label htmlFor="district" className="block text-sm">
                                District
                            </label>
                            <select
                                id="district"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            >
                                <option value="">Select a district</option>
                                {districts.map((district) => (
                                    <option key={district.district} value={district.district}>
                                        {district.district}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Upazila */}
                        <div className="col-span-3">
                            <label htmlFor="upazila" className="block text-sm">
                                Upazila
                            </label>
                            <select
                                id="upazila"
                                value={selectedUpazila}
                                onChange={(e) => setSelectedUpazila(e.target.value)}
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            >
                                <option value="">Select an upazila</option>
                                {filteredUpazilas.map((upazila, index) => (
                                    <option key={index} value={upazila}>
                                        {upazila}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Hospital Name */}
                        <div className="col-span-3">
                            <label htmlFor="hospitalName" className="block text-sm">
                                Hospital Name
                            </label>
                            <input
                                id="hospitalName"
                                type="text"
                                value={hospitalName}
                                onChange={(e) => setHospitalName(e.target.value)}
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            />
                        </div>
                        {/* Full Address */}
                        <div className="col-span-full">
                            <label htmlFor="fullAddress" className="block text-sm">
                                Full Address
                            </label>
                            <input
                                id="fullAddress"
                                type="text"
                                value={fullAddress}
                                onChange={(e) => setFullAddress(e.target.value)}
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            />
                        </div>
                        {/* Blood Group */}
                        <div className="col-span-2">
                            <label htmlFor="bloodGroup" className="block text-sm">
                                Blood Group
                            </label>
                            <select
                                id="bloodGroup"
                                value={bloodGroup}
                                onChange={(e) => setBloodGroup(e.target.value)}
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        {/* Donation Date */}
                        <div className="col-span-2">
                            <label htmlFor="donationDate" className="block text-sm">
                                Donation Date
                            </label>
                            <input
                                id="donationDate"
                                type="date"
                                value={donationDate}
                                onChange={(e) => setDonationDate(e.target.value)}
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            />
                        </div>
                        {/* Donation Time */}
                        <div className="col-span-2">
                            <label htmlFor="donationTime" className="block text-sm">
                                Donation Time
                            </label>
                            <input
                                id="donationTime"
                                type="time"
                                value={donationTime}
                                onChange={(e) => setDonationTime(e.target.value)}
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                            />
                        </div>
                        {/* Request Message */}
                        <div className="col-span-full">
                            <label htmlFor="requestMessage" className="block text-sm">
                                Request Message
                            </label>
                            <textarea
                                id="requestMessage"
                                value={requestMessage}
                                onChange={(e) => setRequestMessage(e.target.value)}
                                className="w-full px-4 border py-2 rounded-md border-gray-300"
                                rows="4"
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="text-right mt-4">
                        <button
                            type="submit"
                            disabled={isBlocked}
                            className={`px-6 py-2 ${
                                isBlocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-900 hover:bg-red-700'
                            } text-white rounded-md`}
                        >
                            Submit Request
                        </button>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default CreateDonationPage;
