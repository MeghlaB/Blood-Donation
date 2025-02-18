import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Blood() {
  return (
    <>
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12">
        
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
        <Link to={'/register'}>
         <a 
            href="#register" 
            className="bg-white text-red-800 px-4 py-2 mt-8 rounded-lg font-semibold shadow-md hover:bg-red-700 hover:text-white transition duration-300">
            CLICK HERE
          </a>
        </Link>
        </motion.div>

        {/* Facebook Join Section */}
        <motion.div 
          className="bg-gray-100 p-6 text-center rounded-xl shadow-lg flex flex-col justify-center items-center h-[250px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold text-gray-800">Join Us on Facebook</h2>
          <p className="text-xs text-gray-600">Commit to Blood Donation, Bangladesh</p>
          <div className="w-full max-w-xs">
            <iframe 
              className="w-full rounded-lg shadow-md mt-2" 
              height="100"  
              src="https://www.facebook.com/plugins/page.php" 
              frameBorder="0" 
              allowFullScreen>
            </iframe>
          </div>
        </motion.div>

        {/* Blood Donation Awareness Section */}
        <motion.div 
          className="bg-black text-white p-6 text-center rounded-xl shadow-lg flex flex-col justify-center items-center h-[250px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-bold">Donate Blood, Save Lives</h2>
          <p className="text-xs italic">A single blood donation can save a life.</p>
          <div className="w-full max-w-xs">
            <iframe 
              className="w-full rounded-lg shadow-md mt-2" 
              height="100"  
              src="https://www.youtube.com/embed/samplevideo" 
              frameBorder="0" 
              allowFullScreen>
            </iframe>
          </div>
        </motion.div>

      </section>
    </>
  );
}

export default Blood;
