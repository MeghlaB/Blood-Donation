import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../Context/ThemeProvider";

const testimonials = [
  {
    id: 1,
    name: "Rakib Hasan",
    role: "Blood Donor",
    story:
      "I was able to save a child's life through my first blood donation. It was truly a proud moment for me!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ayesha Rahman",
    role: "Blood Recipient",
    story:
      "After an accident, I needed an urgent blood transfusion. Thanks to a donor, I got a second chance at life!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Mahmudul Karim",
    role: "Blood Donor",
    story:
      "Donating blood regularly has been a rewarding experience. I encourage everyone to do it!",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);
  
  const getBgClass = () => (theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900");
  const getCardBgClass = () => (theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-white text-gray-800");
  const getTextClass = () => (theme === "dark" ? "text-gray-200" : "text-gray-700");
  const getSubTextClass = () => (theme === "dark" ? "text-gray-400" : "text-gray-600");

  return (
    <section className={`container mx-auto px-6 py-12 `}>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6">
          Success Stories (Testimonials)
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className={`p-6 rounded-xl shadow-md flex flex-col items-center text-center transition duration-300 ${getCardBgClass()}`}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mb-4 border-4 border-red-500"
            />
            <h3 className={`text-xl font-semibold ${getTextClass()}`}>{testimonial.name}</h3>
            <p className="text-red-600 font-medium">{testimonial.role}</p>
            <p className={`mt-3 ${getSubTextClass()}`}>"{testimonial.story}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
