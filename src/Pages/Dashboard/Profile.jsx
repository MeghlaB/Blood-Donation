import React, { useEffect, useState } from "react";
import UseAuth from "../../Components/Hooks/UseAuth";
import AxiosPublic from "../../Components/Hooks/AxiosPublic";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Profile() {
  const pera = useLoaderData()
  console.log(pera)
  const { user ,donateUserRegistration, UpdateProfile } = UseAuth();
  const axiosPublic = AxiosPublic();
  // const { donateUserRegistration, UpdateProfile } = useContext(AuthContext);
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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load district data. Please try again later.",
        });
      });
  }, []);

  // Handle district change
  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    const foundDistrict = districts.find(d => d.district === selectedDistrict);
    setFilteredUpazilas(foundDistrict ? foundDistrict.upazilas : []);
    reset({ upozela: "" }); 
  };

  // Form submission
  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    // Image upload with ImageBB
    const imageFile = new FormData();
    imageFile.append("image", data.photo[0]);

    try {
      const res = await axios.post(image_hosting_api, imageFile);
      const imageURL = res.data.data.display_url;

      console.log("Uploaded Image URL:", imageURL);

      donateUserRegistration(data.email, data.password)
        .then((result) => {
          const loggedUser = result.user;

          console.log("Registered User:", loggedUser);

          // Update user profile with name and photo
          UpdateProfile(data.name, imageURL)
            .then(() => {
              console.log("Profile updated successfully.");

              // Prepare user data for database
              const userData = {
                name: data.name,
                email: data.email,
                avatar: imageURL,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upozela,
                status: "active", 
                role: "donor",     
              };

              // Save user data to your database
              axiosPublic.post("/users", userData)
                .then(() => {
                  console.log("User data saved successfully.");
                  if (res.data.insertedId) {
                    console.log('user data added');
                    reset();
                    Swal.fire({
                      title: "User Successfully Account Created",
                      showClass: {
                        popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `
                      },
                      hideClass: {
                        popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `
                      }
                    });
                    navigate('/');
                  }
                })
                .catch((error) => {
                  console.error("Error saving user data:", error.message);
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error saving user data. Please try again later.",
                  });
                });

            })
            .catch((error) => {
              console.error("Profile Update Error:", error.message);
              Swal.fire({
                icon: "error",
                title: "Profile Update Error",
                text: "Something went wrong while updating your profile. Please try again later.",
              });
            });

        })
        .catch((error) => {
          console.error("Profile Update Error:", error.message);
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "There was an issue with your registration. Please check your details and try again.",
          });
        });

    } catch (error) {
      console.error("Image Upload Error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "There was an issue uploading your image. Please try again.",
      });
    }
  }


  return (
   <div className="mt-24">

      <div className="w-full space-y-4 rounded-lg border bg-white px-6 lg:px-20 py-8 lg:py-10 shadow-lg">
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
          <div className="form-control w-full my-6">
            <input {...register('photo', { required: true })} type="file" className="file-input w-full max-w-xs" />
            {errors.photo && <p className="text-red-500">Photo is required</p>}
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

          

          {/* Submit Button */}
          <input
            type="submit"
            className="w-full btn bg-red-900 text-white hover:bg-red-900 border-none"
            value="Edit"
          />
        </form>
    
      </div>
    </div>
		
	
   
  );
}
