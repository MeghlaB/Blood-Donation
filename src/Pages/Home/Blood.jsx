import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeProvider";

function Blood() {
  const { theme } = useContext(ThemeContext);

  const getBgClass = () =>
    theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const getCardBgClass = () =>
    theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-white text-gray-800";
  const getTextClass = () =>
    theme === "dark" ? "text-gray-200" : "text-gray-700";
  const getSubTextClass = () =>
    theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <section className={`container mx-auto px-6 py-12 `}>
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-8">
        Blood Donation & Awareness
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Registration Section */}
        <motion.div
          className="bg-red-800 text-white p-6 text-center rounded-xl shadow-lg flex flex-col justify-center items-center h-[250px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-bold">Register as a Blood Donor</h2>
          <p className="text-sm italic pb-3">Be a Hero, Save Lives</p>
          <Link to={"/register"}>
            <button className="bg-white text-red-800 px-4 py-2 mt-8 rounded-lg font-semibold shadow-md hover:bg-red-700 hover:text-white transition duration-300">
              CLICK HERE
            </button>
          </Link>
        </motion.div>

        {/* Facebook Join Section */}
        <motion.div
          className={`p-6 text-center rounded-xl shadow-lg flex flex-col justify-center items-center h-[250px] ${getCardBgClass()}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className={`text-lg font-semibold ${getTextClass()}`}>
            Join Us on Facebook
          </h2>
          <p className={`text-xs ${getSubTextClass()}`}>
            Commit to Blood Donation, Bangladesh
          </p>
          <div className="w-full max-w-xs">
            <iframe
              className="w-full rounded-lg shadow-md mt-2"
              height="100"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBloodDonorsClub.bd&tabs&width=340&height=100&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* Blood Donation Awareness Section */}
        <motion.div
          className={`p-6 text-center rounded-xl shadow-lg flex flex-col justify-center items-center h-[250px] ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-black"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-bold">Donate Blood, Save Lives</h2>
          <p className="text-xs italic">
            A single blood donation can save a life.
          </p>
          <div className="w-full max-w-xs">
            <iframe
              className="w-full rounded-lg shadow-md mt-2"
              height="100"
              src="https://www.youtube.com/embed/632uoaC36C4"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Blood;
