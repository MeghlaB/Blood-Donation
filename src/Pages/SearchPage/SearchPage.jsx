import React, { useState, useEffect, useContext } from "react";
import AxiosPublic from "../../Components/Hooks/AxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";
import { ThemeContext } from "../../Context/ThemeProvider";

export default function SearchPage() {
  const { theme } = useContext(ThemeContext);
  const axiosPublic = AxiosPublic();

  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [donors, setDonors] = useState([]);
  const [allDonors, setAllDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Dynamic Classes for Theme
  const themeClasses = theme === "dark" ? "bg-slate-900 text-gray-100" : "bg-white text-gray-900";
  const cardClasses = theme === "dark" ? "bg-gray-700 text-gray-300 shadow-lg" : "bg-white text-gray-800 shadow-md";
  const textClasses = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const subTextClasses = theme === "dark" ? "text-gray-400" : "text-gray-600";

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
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load district data. Please try again later.",
        });
      });

    axiosPublic
      .get("/donars")
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

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setNoResults(false);

    const filteredDonors = allDonors.filter(
      (donor) =>
        (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
        (selectedDistrict ? donor.district === selectedDistrict : true)
    );

    setTimeout(() => {
      setDonors(filteredDonors);
      setNoResults(filteredDonors.length === 0);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${themeClasses} p-6`}>
      <div className="w-full max-w-3xl mx-auto">
        <section className={`p-8 mt-16 rounded-lg ${cardClasses}`}>
          <h2 className="text-3xl font-bold text-center mb-6">Find a Blood Donor</h2>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="district" className={`block font-medium ${textClasses}`}>
                  District:
                </label>
                <select
                  id="district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
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
                <label htmlFor="bloodGroup" className={`block font-medium ${textClasses}`}>
                  Blood Group:
                </label>
                <select
                  id="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full p-3 text-white rounded-md ${
                loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-500"
              }`}
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
                <div
                  key={donor._id}
                  className={`p-6 border rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${cardClasses}`}
                >
                  <h3 className="font-semibold text-xl">{donor.name}</h3>
                  <p className={`text-sm ${subTextClasses}`}>
                    Blood Group: <strong>{donor.bloodGroup}</strong>
                  </p>
                  <p className={`text-sm ${subTextClasses}`}>District: {donor.district}</p>
                </div>
              ))}
            </div>

            {!showAll && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAll(true)}
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
    </div>
  );
}
