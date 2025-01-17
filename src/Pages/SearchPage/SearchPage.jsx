import React, { useState, useEffect } from "react";
import AxiosPublic from "../../Components/Hooks/AxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";

export default function SearchPage() {
  const axiosPublic = AxiosPublic();
  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const selected = event.target.value;
    setSelectedDistrict(selected);
    const foundDistrict = districts.find((d) => d.district === selected);
    setFilteredUpazilas(foundDistrict ? foundDistrict.upazilas : []);
    setSelectedUpazila(""); 
  };

const handleSearch = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await axiosPublic.get("/donars", {
      params: {
        bloodGroup,
        district: selectedDistrict,
        upazila: selectedUpazila,
      },
    });
    setDonors(response.data);
    if (response.data.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Results",
        text: "No donors found for the selected criteria.",
      });
    }
  } catch (error) {
    console.error("Error fetching donors:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to fetch donor data. Please try again later.",
    });
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="p-6 mt-48">
      {/* Search Form */}
      <section className="p-6 mt-20 bg-gray-100 text-gray-900">
        <form onSubmit={handleSearch} className="container mx-auto space-y-6">
          <fieldset className="p-6 rounded-md shadow-sm bg-white">
            <div className="grid grid-cols-6 gap-4">
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
            </div>
            {/* Submit Button */}
            <div className="text-right mt-4">
              <button
                type="submit"
                className={`px-6 py-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-900 hover:bg-red-700"
                } text-white rounded-md`}
                disabled={loading}
              >
                {loading ? "Searching..." : "Submit Request"}
              </button>
            </div>
          </fieldset>
        </form>
      </section>

      {/* Donors List */}
      {donors.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Donor List</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <h3 className="text-lg font-semibold">{donor.name}</h3>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>District: {donor.district}</p>
                <p>Upazila: {donor.upazila}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {donors.length === 0 && !loading && (
        <p className="text-center mt-8">No donors found for the selected criteria.</p>
      )}
    </div>
  );
}
