import React, { useEffect, useState } from "react";
import UseAuth from "../../Components/Hooks/UseAuth";
import AxiosPublic from "../../Components/Hooks/AxiosPublic";

export default function Profile() {
  const { user } = UseAuth();
  const axiosPublic = AxiosPublic();

  const [isEditable, setIsEditable] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    district: "",
    upazila: "",
    bloodGroup: "",
    photoURL: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosPublic.get(`/users/profile?email=${user?.email}`);
        setUpdatedData(response.data || {});
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user?.email) fetchUserProfile();
  }, [user?.email, axiosPublic]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Save profile updates
  const handleSave = async () => {
    const formData = new FormData();
    Object.keys(updatedData).forEach((key) => {
      if (key !== "email") {
        formData.append(key, updatedData[key]);
      }
    });

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      const response = await axiosPublic.put(`/users/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!updatedData) return <div>Loading...</div>;

  return (
    <div className="p-6 mt-9">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form>
        <div className="avatar flex items-center justify-center mb-4">
          <div className="w-32 rounded">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-full"
            />
          </div>
        </div>
        {isEditable && (
          <div className="form-control mb-4">
            <label className="label font-medium">Change Profile Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>
        )}

        <div className="form-control mb-4">
          <label className="label font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={updatedData.name || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={updatedData.email || ""}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label font-medium">District</label>
          <input
            type="text"
            name="district"
            value={updatedData.district || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label font-medium">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={updatedData.upazila || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label font-medium">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={updatedData.bloodGroup || ""}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mt-4">
          {isEditable ? (
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary w-full"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              className="btn btn-secondary w-full"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
