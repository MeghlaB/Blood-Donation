import React, { useEffect, useState } from "react";
import UseAuth from "../../Components/Hooks/UseAuth";
import AxiosPublic from "../../Components/Hooks/AxiosPublic";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Profile() {
  const { user } = UseAuth();
  const axiosPublic = AxiosPublic();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [districts, setDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data for the user
  useEffect(() => {
    if (user?.email) {
      // console.log("Fetching profile data for:", user?.email);
      axiosPublic.get(`/users/profile/${user?.email}`)
        .then((res) => {
          // console.log("Profile data response:", res.data);
          setProfileData(res.data); 
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    } else {
      // console.log("No user email found");
    }
  }, [user?.email]);

 

  return (
<div className="bg-white w-96 mx-auto py-10 rounded-lg shadow-lg mt-10">
  {/* Avatar Section */}
  <div className="w-36 h-36 mx-auto mt-5 mb-6">
    <img
      src={profileData?.avatar}
      className="w-36 h-36 rounded-full border-4 border-red-900 shadow-lg"
      alt="User Avatar"
    />
  </div>

  {/* Profile Info Section */}
  <div className="px-6">
    <h1 className="text-xl font-semibold text-gray-800 mb-3">
      <strong>Name:</strong> {profileData?.name}
    </h1>
    <h1 className="text-lg text-gray-600 mb-3">
      <strong>Location:</strong> {`${profileData?.district}, ${profileData?.upazila}`}
    </h1>
    <h1 className="text-lg text-gray-600 mb-3">
      <strong>Blood Group:</strong> {profileData?.bloodGroup}
    </h1>
    <h1 className="text-lg text-gray-600 mb-6">
      <strong>Role:</strong> {profileData?.role}
    </h1>

    {/* Edit Button */}
    <Link to={`update/${profileData?._id}`}>
    <button className="w-full py-2 bg-red-900 text-white rounded-lg hover:bg-red-700 transition duration-300">
      Edit Profile
    </button>
    </Link>
  </div>
</div>

  );
}
