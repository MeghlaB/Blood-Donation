import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import AxiosPublic from "../../Components/Hooks/AxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function ProfileUpdate() {
  const userProfile = useLoaderData();
  const axiosPublic = AxiosPublic();
  const { UpdateProfile } = useContext(AuthContext);
  
  const [districts, setDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
const naviagte = useNavigate()


  useEffect(() => {
    axios
      .get("/distric.json")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDistricts(response.data);
        } else {
          console.error("Invalid district data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching districts data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load district data. Please try again later.",
        });
      });
  }, []);


  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    const foundDistrict = districts.find(
      (d) => d.district === selectedDistrict
    );
    setFilteredUpazilas(foundDistrict ? foundDistrict.upazilas : []);
    reset({ upazila: "" });
  };

  // Handle form submission
  const onSubmit = async (data) => {
    let avatarUrl = userProfile.avatar; 

  
    if (data.photo?.[0]) {
      try {
        const imageFile = new FormData();
        imageFile.append("image", data.photo[0]);
        const response = await axios.post(image_hosting_api, imageFile); 
        avatarUrl = response.data.data.display_url; 
      } catch (error) {
        console.error("Image Upload Error:", error);
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: "Could not upload the image. Please try again.",
        });
        return; 
      }
    }
    const updatedData = {
      name: data.name,
      district: data.district,
      upazila: data.upazila,
      bloodGroup: data.bloodGroup,
      avatar: avatarUrl, 
    };
    try {
      const response = await axiosPublic.put(`/update/${userProfile._id}`, updatedData);
      if(response.data){
        Swal.fire({
          title: "Profile updated successfully",
          icon: "success",
        });
        naviagte('/dashboard/profile')

      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update the profile. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 lg:p-12 mt-16">
      <div className="w-full lg:w-1/2 pb-6 lg:mb-0">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center">
          Update Profile
        </h2>
      </div>

      <div className="w-full lg:w-1/2 space-y-4 rounded-lg border bg-white px-6 lg:px-20 py-8 lg:py-10 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue={userProfile.name}
              {...register("name", { required: "Full name is required" })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email (read-only) */}
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={userProfile.email}
              readOnly
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label htmlFor="photo" className="block font-medium">
              Upload Photo
            </label>
            <input
              {...register("photo")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          {/* District */}
          <div>
            <label htmlFor="district" className="block font-medium">
              District
            </label>
            <select
              id="district"
              {...register("district", { required: "District is required" })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
              onChange={handleDistrictChange}
              defaultValue={userProfile.district}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district.district}>
                  {district.district}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500">{errors.district.message}</p>
            )}
          </div>

          {/* Upazila */}
          <div>
            <label htmlFor="upozela" className="block font-medium">
              Upazila
            </label>
            <select
              id="upozela"
              {...register("upazila", { required: "Upazila is required" })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
              defaultValue={userProfile.upazila}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila, index) => (
                <option key={index} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
            {errors.upazila && (
              <p className="text-red-500">{errors.upazila.message}</p>
            )}
          </div>

          {/* Blood Group */}
          <div>
            <label htmlFor="bloodGroup" className="block font-medium">
              Blood Group
            </label>
            <input
              id="bloodGroup"
              type="text"
              defaultValue={userProfile.bloodGroup}
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
            />
            {errors.bloodGroup && (
              <p className="text-red-500">{errors.bloodGroup.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className="w-full btn bg-red-900 text-white hover:bg-red-800 border-none"
            value="Update Profile"
          />
        </form>
      </div>
    </div>
  );
}
