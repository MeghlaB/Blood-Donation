import React, { useState, useEffect } from "react";
import AxiosPublic from "../../Components/Hooks/AxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";

export default function SearchPage() {
  const axiosPublic = AxiosPublic();
  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [donors, setDonors] = useState([]);
  const [allDonors, setAllDonors] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); 
  const [showAll, setShowAll] = useState(false);  

  useEffect(() => {
    // Fetch districts data
    axios
      .get("/distric.json")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDistricts(response.data);
        } else {
          console.error("Invalid district data format");
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load district data. Please try again later.",
        });
      });

    // Fetch all donors initially
    axiosPublic.get("/donars")
      .then((response) => {
        setAllDonors(response.data); 
        setDonors(response.data); 
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load donor data. Please try again later.",
        });
      });
  }, []);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNoResults(false);

    try {
      
      let filteredDonors = allDonors;

  
      if (bloodGroup || selectedDistrict) {
        filteredDonors = allDonors.filter((donor) => {
          return (
            (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
            (selectedDistrict ? donor.district === selectedDistrict : true)
          );
        });
      }

      setDonors(filteredDonors);

      if (filteredDonors.length === 0) {
        setNoResults(true); 
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while fetching donor data. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto bg-gray-50">
      <section className="p-8 mt-16 bg-white shadow-xl rounded-lg shadow-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Find a Blood Donor</h2>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="district" className="block font-medium text-gray-700">District:</label>
              <select
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select a district</option>
                {districts.map((district) => (
                  <option key={district.district} value={district.district}>
                    {district.district}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bloodGroup" className="block font-medium text-gray-700">Blood Group:</label>
              <select
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-white rounded-md ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-500"}`}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Donors"}
          </button>
        </form>
      </section>

      {donors.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Available Donors</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {donors.slice(0, showAll ? donors.length : 6).map((donor) => (
              <div key={donor._id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-semibold text-xl text-gray-800">{donor.name}</h3>
                <p className="text-sm text-gray-600 mt-2">Blood Group: <strong>{donor.bloodGroup}</strong></p>
                <p className="text-sm text-gray-600">District: {donor.district}</p>
              </div>
            ))}
          </div>
          Show "See All" 
          {!showAll && (
            <div className="mt-6 text-center">
              <button
                onClick={handleShowAll}
                className="px-6 py-2 text-white bg-red-700 hover:bg-red-500 rounded-md"
              >
                See All
              </button>
            </div>
          )}
        </section>
      )}

      
      {noResults && !loading && (
        <p className="text-center text-red-600 mt-8 text-lg font-semibold">No donors found for the selected criteria.</p>
      )}

      {donors.length === 0 && !loading && !noResults && (
        <p className="text-center text-gray-600 mt-8">No donors found for the selected criteria.</p>
      )}
    </div>
  );
}
