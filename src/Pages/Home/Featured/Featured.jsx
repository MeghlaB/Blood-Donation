import React, { useContext, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThemeContext } from '../../../Context/ThemeProvider';
import { HeartPulse, MapPin, Users, ShieldCheck, CalendarDays, BarChart3 } from "lucide-react";

export default function Featured() {
   const { theme } = useContext(ThemeContext);
  
    const getBgClass = () => (theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900");
    const getCardBgClass = () => (theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-white text-gray-800");
    const getTextClass = () => (theme === "dark" ? "text-gray-200" : "text-gray-700");
    const getSubTextClass = () => (theme === "dark" ? "text-gray-400" : "text-gray-700");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const features = [
    { icon: <HeartPulse className="text-red-500 w-12 h-12 mx-auto mb-4" />, title: "Life-Saving Platform", desc: "Connect with patients in need directly and be a hero by donating blood." },
    { icon: <MapPin className="text-blue-500 w-12 h-12 mx-auto mb-4" />, title: "Real-Time Search", desc: "Find and connect with nearby blood donation campaigns instantly." },
    { icon: <Users className="text-green-500 w-12 h-12 mx-auto mb-4" />, title: "Community Support", desc: "Join a compassionate network of donors and volunteers dedicated to saving lives." },
    { icon: <ShieldCheck className="text-yellow-500 w-12 h-12 mx-auto mb-4" />, title: "Verified & Secure", desc: "All donors and recipients are verified for a secure and trustworthy experience." },
    { icon: <CalendarDays className="text-purple-500 w-12 h-12 mx-auto mb-4" />, title: "Organized Drives", desc: "Participate in well-organized donation drives to help reach those in urgent need." },
    { icon: <BarChart3 className="text-teal-500 w-12 h-12 mx-auto mb-4" />, title: "Track Your Impact", desc: "See how your blood donations are making a difference in the lives of others." }
  ];

  return (
    <section className={`py-16 `}>
      <div className="container mx-auto px-4" data-aos="zoom-in">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-600">
            Our <span className={getTextClass()}>Featured Section!</span>
          </h2>
          <p className={` mt-4 ${getSubTextClass()}`}>
            Saving lives has never been easier! Join hands with us and make an impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`shadow-md rounded-lg p-6 text-center transition transform hover:scale-105 ${getCardBgClass()}`} 
              data-aos="fade-up" 
              data-aos-delay={index * 200}
            >
              {feature.icon}
              <h3 className={`text-2xl font-bold ${getTextClass()}`}>{feature.title}</h3>
              <p className={` mt-4 ${getSubTextClass()}`}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
