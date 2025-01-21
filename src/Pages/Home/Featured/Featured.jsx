import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Featured() {
  useEffect(() => {
    
    AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);

  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4" data-aos="zoom-in">
          {/* Section title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-600">
            Our <span className="text-gray-800">Featured Section!</span>
            </h2>
            <p className="text-gray-600 mt-4">
              Saving lives has never been easier! Join hands with us and make an impact.
            </p>
          </div>

          {/* Featured grid section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Grid-1 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center" data-aos="fade-up">
              <div className="text-red-500 text-5xl mb-4">
                <i className="fas fa-hand-holding-medical"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Life-Saving Platform</h3>
              <p className="text-gray-600 mt-2">
                Connect with patients in need directly and be a hero by donating blood.
              </p>
            </div>

            {/* Grid-2 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="text-blue-500 text-5xl mb-4">
                <i className="fas fa-search-location"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Real-Time Search</h3>
              <p className="text-gray-600 mt-2">
                Find and connect with nearby blood donation campaigns instantly.
              </p>
            </div>

            {/* Grid-3 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center" data-aos="fade-up" data-aos-delay="400">
              <div className="text-green-500 text-5xl mb-4">
                <i className="fas fa-user-friends"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Community Support</h3>
              <p className="text-gray-600 mt-2">
                Join a compassionate network of donors and volunteers dedicated to saving lives.
              </p>
            </div>

            {/* Grid-4 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center" data-aos="fade-up" data-aos-delay="600">
              <div className="text-yellow-500 text-5xl mb-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Verified & Secure</h3>
              <p className="text-gray-600 mt-2">
                All donors and recipients are verified for a secure and trustworthy experience.
              </p>
            </div>

            {/* Grid-5 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center" data-aos="fade-up" data-aos-delay="800">
              <div className="text-purple-500 text-5xl mb-4">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Organized Drives</h3>
              <p className="text-gray-600 mt-2">
                Participate in well-organized donation drives to help reach those in urgent need.
              </p>
            </div>

            {/* Grid-6 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center" data-aos="fade-up" data-aos-delay="1000">
              <div className="text-teal-500 text-5xl mb-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Track Your Impact</h3>
              <p className="text-gray-600 mt-2">
                See how your blood donations are making a difference in the lives of others.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
