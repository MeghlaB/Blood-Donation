import React, { useContext, useEffect, useState } from "react";
import UseAuth from "../../Components/Hooks/UseAuth";
import AxiosPublic from "../../Components/Hooks/AxiosPublic";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../Context/ThemeProvider";

export default function Profile() {
  const { theme } = useContext(ThemeContext);
  const { user } = UseAuth();
  const axiosPublic = AxiosPublic();
  const [profileData, setProfileData] = useState(null);

  const getBgClass = () => (theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900');
  const getCardBgClass = () => (theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800');
  const getTextClass = () => (theme === 'dark' ? 'text-gray-200' : 'text-gray-700');
  const getSubTextClass = () => (theme === 'dark' ? 'text-gray-400' : 'text-gray-600');

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/profile/${user?.email}`)
        .then((res) => {
          setProfileData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [user?.email]);

  return (
    <div className={`${getBgClass()} w-full max-w-md mx-auto py-10 rounded-lg shadow-lg mt-10`}>
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
        <h1 className="text-xl font-semibold mb-3 text-center text-red-900">
          <strong>Name:</strong> {profileData?.name}
        </h1>
        <h2 className={`text-lg ${getTextClass()} mb-3`}>
          <strong>Location:</strong> {`${profileData?.district}, ${profileData?.upazila}`}
        </h2>
        <h2 className={`text-lg ${getTextClass()} mb-3`}>
          <strong>Blood Group:</strong> {profileData?.bloodGroup}
        </h2>
        <h2 className={`text-lg ${getTextClass()} mb-6`}>
          <strong>Role:</strong> {profileData?.role}
        </h2>

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
