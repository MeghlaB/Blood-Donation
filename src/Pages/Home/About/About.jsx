import React from "react";
import { motion } from "framer-motion";
import { Heart, UserCheck, RefreshCcw } from "lucide-react";

const About = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      <motion.div
        className="  p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          About Blood Donation
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Why Blood Donation is Important */}
          <motion.div
            className="bg-white text-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="text-red-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">
              Why is Blood Donation Important?
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Blood donation saves lives by supporting surgeries, accident victims, cancer patients, and those with blood disorders.
            </p>
          </motion.div>

          {/* Who Can Donate Blood? */}
          <motion.div
            className="bg-white text-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <UserCheck className="text-green-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">
              Who Can Donate Blood?
            </h3>
            <ul className="list-disc text-sm text-gray-600 pl-6">
              <li>Age: 18-65 years</li>
              <li>Minimum weight: 50 kg</li>
              <li>Good overall health</li>
              <li>No recent infections</li>
            </ul>
          </motion.div>

          {/* How Often Can Someone Donate? */}
          <motion.div
            className="bg-white text-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <RefreshCcw className="text-blue-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">
              How Often Can You Donate?
            </h3>
            <p className="text-sm text-gray-600 text-center">
              - Whole blood: Every 3-4 months <br />
              - Platelets: Every 2 weeks <br />
              - Plasma: Every 4 weeks
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
