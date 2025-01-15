import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";

export default function Register() {
  const { donateUserRegistration, UpdateProfile } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Fetch districts and upazilas from the JSON file
  useEffect(() => {
    axios.get("/distric.json")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDistricts(response.data);
        } else {
          console.error("Invalid district data format");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching districts data:", error);
        setIsLoading(false);
      });
  }, []);

  // Handle district change
  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    const foundDistrict = districts.find(d => d.district === selectedDistrict);
    setFilteredUpazilas(foundDistrict ? foundDistrict.upazilas : []);
    reset({ upozela: "" }); // Clear the upazila field on district change
  };

  // Form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);

    donateUserRegistration(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log("Registered User:", loggedUser);

        UpdateProfile(data.name, data.photo)
          .then(() => {
            console.log("Profile updated successfully.");
            
          });
      })
      .catch((error) => {
        console.error("Registration Error:", error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 lg:p-12 mt-16">
      <div className="w-full lg:w-1/2 pb-6 lg:mb-0">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center">Welcome to Blood Bond</h2>
        <p className="text-md text-gray-600 mt-2 text-center">
          Please fill in the details below to register and join our community.
        </p>
      </div>

      <div className="w-full lg:w-1/2 space-y-4 rounded-lg border bg-white px-6 lg:px-20 py-8 lg:py-10 shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Blood Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block font-medium">Full Name</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Full name is required" })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photo" className="block font-medium">Photo URL</label>
            <input
              id="photo"
              type="url"
              {...register("photo", { required: "Photo URL is required" })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
            />
            {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
          </div>

          {/* District */}
          <div>
            <label htmlFor="district" className="block font-medium">District</label>
            <select
              id="district"
              {...register("district", { required: "District is required" })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
              onChange={handleDistrictChange}
              disabled={isLoading}
            >
              <option value="">Select a district</option>
              {districts.map((district) => (
                <option key={district.district} value={district.district}>{district.district}</option>
              ))}
            </select>
            {errors.district && <p className="text-red-500">{errors.district.message}</p>}
          </div>

          {/* Upazila */}
          <div>
            <label htmlFor="upozela" className="block font-medium">Upazila</label>
            <select
              id="upozela"
              {...register("upozela", { required: "Upazila is required" })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
            >
              <option value="">Select an upazila</option>
              {filteredUpazilas.map((upazila, index) => (
                <option key={index} value={upazila}>{upazila}</option>
              ))}
            </select>
            {errors.upozela && <p className="text-red-500">{errors.upozela.message}</p>}
          </div>

          {/* Blood Group */}
          <div>
            <label htmlFor="bloodGroup" className="block font-medium">Blood Group</label>
            <select
              id="bloodGroup"
              {...register("bloodGroup", { required: "Blood group is required" })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
            >
              <option value="">Select a blood group</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
            {errors.bloodGroup && <p className="text-red-500">{errors.bloodGroup.message}</p>}
          </div>
           {/* Password */}
           <div>
            <label htmlFor="password" className="block font-medium">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block font-medium">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", { 
                required: "Confirm password is required", 
                validate: (value) => value === watch("password") || "Passwords don't match"
              })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className="btn w-full btn-primary"
            value="Sign Up"
          />
        </form>
        <p className="text-center text-sm text-gray-700 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
