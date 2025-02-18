import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Does blood donation make you weak?",
    answer:
      "No, the body usually recovers the lost fluids within 24-48 hours. Eating a balanced diet helps speed up recovery.",
  },
  {
    question: "What should I eat after donating blood?",
    answer:
      "Stay hydrated and eat iron-rich foods like spinach, eggs, and red meat to replenish nutrients.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood every 3-4 months, platelets every 2 weeks, and plasma every month.",
  },
  {
    question: "Can I donate blood if I have a tattoo?",
    answer:
      "Yes, but you should wait at least 6 months after getting a tattoo, depending on local health guidelines.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-6 py-12">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold ">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-2">
          Find answers to common questions about blood donation.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-xl mb-4 shadow-sm bg-white"
            whileHover={{ scale: 1.02 }}
          >
            <button
              className="w-full p-4 flex justify-between items-center text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-semibold text-gray-800">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="text-red-500" />
              ) : (
                <ChevronDown className="text-red-500" />
              )}
            </button>

            {openIndex === index && (
              <motion.div
                className="p-4 bg-gray-50 text-gray-600 rounded-b-xl"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
