import React from "react";
import { motion } from "framer-motion";

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
  return (
    <section className="container mx-auto px-6 py-12">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold  mb-6">
          Success Stories (Testimonials)
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="p-6 rounded-xl shadow-md bg-gray-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mb-4 border-4 border-red-500"
            />
            <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
            <p className="text-red-600 font-medium">{testimonial.role}</p>
            <p className="text-gray-600 mt-3">"{testimonial.story}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
