import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UseAuth from '../../../Components/Hooks/UseAuth';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { ThemeContext } from '../../../Context/ThemeProvider';

const CreateDonationPage = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = UseAuth();
    const axiosSecure = AxiosSecure();
    const navigate = useNavigate();
    
    // States for form fields
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

    // Theme-based styling functions
    const getBgClass = () => (theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900');
    const getCardBgClass = () => (theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800');
    const getTextClass = () => (theme === 'dark' ? 'text-gray-200' : 'text-gray-700');
    const getSubTextClass = () => (theme === 'dark' ? 'text-gray-400' : 'text-gray-600');

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const response = await axiosSecure(`/users/${user?.email}`);
                const userStatus = response.data.status;
                setIsBlocked(userStatus === 'block');
            } catch (error) {
                console.error('Error fetching user status:', error);
                setIsBlocked(true);
            }
        };

        if (user?.email) {
            checkUserStatus();
        }
    }, [user?.email, axiosSecure]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await axios.get('/distric.json');
                if (Array.isArray(response.data)) {
                    setDistricts(response.data);
                } else {
                    console.error('Invalid district data format');
                }
            } catch (error) {
                console.error('Error fetching districts data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to load district data. Please try again later.',
                });
            }
        };

        fetchDistricts();
    }, []);

    const handleDistrictChange = (event) => {
        const selected = event.target.value;
        setSelectedDistrict(selected);

        const foundDistrict = districts.find((d) => d.district === selected);
        setFilteredUpazilas(foundDistrict ? foundDistrict.upazilas : []);
        setSelectedUpazila('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isBlocked) {
            Swal.fire({
                icon: 'error',
                title: 'Blocked User',
                text: 'Your account is blocked. You cannot submit donation requests.',
            });
            return;
        }

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

        try {
            const res = await axiosSecure.post('/donation-requests', donationRequest);
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Donation request created successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/dashboard/my-donation-requests');
                resetForm();
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

    const resetForm = () => {
        setRecipientName('');
        setSelectedDistrict('');
        setSelectedUpazila('');
        setHospitalName('');
        setFullAddress('');
        setBloodGroup('');
        setDonationDate('');
        setDonationTime('');
        setRequestMessage('');
    };

    return (
        <div className={`container mx-auto mt-6 p-6 ${getBgClass()}`}>
            <h1 className="text-2xl lg:text-4xl font-bold text-center">Create Donation <span className="text-red-950">Request</span></h1>

            <section className="mt-5">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <fieldset className={`p-6 rounded-md shadow-sm ${getCardBgClass()}`}>
                        <div className="grid grid-cols-6 gap-4">
                            {/* Requester Name */}
                            <div className="col-span-3">
                                <label htmlFor="requesterName" className="block text-sm">Requester Name*</label>
                                <input
                                    id="requesterName"
                                    type="text"
                                    value={user?.displayName}
                                    readOnly
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                />
                            </div>

                            {/* Requester Email */}
                            <div className="col-span-3">
                                <label htmlFor="requesterEmail" className="block text-sm">Requester Email*</label>
                                <input
                                    id="requesterEmail"
                                    type="email"
                                    value={user?.email}
                                    readOnly
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                />
                            </div>

                            {/* Recipient Name */}
                            <div className="col-span-3">
                                <label htmlFor="recipientName" className="block text-sm">Recipient Name</label>
                                <input
                                    id="recipientName"
                                    type="text"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                />
                            </div>

                            {/* District */}
                            <div className="col-span-3">
                                <label htmlFor="district" className="block text-sm">District</label>
                                <select
                                    id="district"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
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
                                <label htmlFor="upazila" className="block text-sm">Upazila</label>
                                <select
                                    id="upazila"
                                    value={selectedUpazila}
                                    onChange={(e) => setSelectedUpazila(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
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
                                <label htmlFor="hospitalName" className="block text-sm">Hospital Name</label>
                                <input
                                    id="hospitalName"
                                    type="text"
                                    value={hospitalName}
                                    onChange={(e) => setHospitalName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                />
                            </div>

                            {/* Full Address */}
                            <div className="col-span-full">
                                <label htmlFor="fullAddress" className="block text-sm">Full Address</label>
                                <input
                                    id="fullAddress"
                                    type="text"
                                    value={fullAddress}
                                    onChange={(e) => setFullAddress(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                />
                            </div>

                            {/* Blood Group */}
                            <div className="col-span-2">
                                <label htmlFor="bloodGroup" className="block text-sm">Blood Group</label>
                                <select
                                    id="bloodGroup"
                                    value={bloodGroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
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
                                <label htmlFor="donationDate" className="block text-sm">Donation Date</label>
                                <input
                                    id="donationDate"
                                    type="date"
                                    value={donationDate}
                                    onChange={(e) => setDonationDate(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                />
                            </div>

                            {/* Donation Time */}
                            <div className="col-span-2">
                                <label htmlFor="donationTime" className="block text-sm">Donation Time</label>
                                <input
                                    id="donationTime"
                                    type="time"
                                    value={donationTime}
                                    onChange={(e) => setDonationTime(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                />
                            </div>

                            {/* Request Message */}
                            <div className="col-span-full">
                                <label htmlFor="requestMessage" className="block text-sm">Request Message</label>
                                <textarea
                                    id="requestMessage"
                                    value={requestMessage}
                                    onChange={(e) => setRequestMessage(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                    rows="4"
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-8 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Submit Donation Request
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default CreateDonationPage;
