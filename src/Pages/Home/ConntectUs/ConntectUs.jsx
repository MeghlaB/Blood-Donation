import React, { useEffect, useContext } from "react";
import Swal from "sweetalert2";
import 'aos/dist/aos.css';
import Aos from "aos";
import { ThemeContext } from "../../../Context/ThemeProvider";


export default function ConnectUs() {
  const { theme } = useContext(ThemeContext);

  const getBgClass = () => (theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900');
  const getCardBgClass = () => (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800');
  const getTextClass = () => (theme === 'dark' ? 'text-gray-200' : 'text-gray-700');
  const getSubTextClass = () => (theme === 'dark' ? 'text-gray-400' : 'text-gray-600');

  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Thank you for contacting us!",
      showConfirmButton: false,
      timer: 1500
    });
  };

  useEffect(() => {
    Aos.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div className=''>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              Contact <span className="text-red-600">Us</span>
            </h2>
            <p className={getSubTextClass()}>
              Have questions or need assistance? Feel free to reach out to us!
            </p>
          </div>

          {/* Contact Section Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up">
            {/* Contact Form */}
            <div className={` shadow-md rounded-lg p-6`}>
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                  <label htmlFor="name" className="block font-semibold">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block font-semibold">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {/* Message Field */}
                <div className="mb-4">
                  <label htmlFor="message" className="block font-semibold">Your Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Write your message here"
                    required
                  ></textarea>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn bg-red-900 text-white hover:bg-red-800 border-none transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className={`${getCardBgClass()} shadow-md rounded-lg p-6 text-center`}>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className={getSubTextClass()}>We are here to help! Reach us via phone or visit our office.</p>
              {/* Contact Details */}
              <div className="text-left mt-4">
                <p className="flex items-center mb-4">
                  <span className="text-red-600 text-xl mr-4">📞</span>
                  +880-123-456-7890
                </p>
                <p className="flex items-center mb-4">
                  <span className="text-red-600 text-xl mr-4">📧</span>
                  support@blooddonation.com
                </p>
                <p className="flex items-center mb-4">
                  <span className="text-red-600 text-xl mr-4">📍</span>
                  123 Blood Donation St., Dhaka, Bangladesh
                </p>
              </div>
              {/* Social Media */}
              <div className="mt-6 flex justify-center space-x-4">
                <a href="#" className="text-gray-600 hover:text-red-600 text-2xl" aria-label="Facebook">👍</a>
                <a href="#" className="text-gray-600 hover:text-red-600 text-2xl" aria-label="Twitter">🐦</a>
                <a href="#" className="text-gray-600 hover:text-red-600 text-2xl" aria-label="Instagram">📸</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
