import React, { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeProvider';
import Header from '../../Common/Header';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import ConnectUs from './ConntectUs/ConntectUs';
import Benifits from './Benifits/Benifits';
import Blood from './Blood';
import About from './About/About';
import Testimonials from './Testimonials/Testimonials';
import Faqs from './Fqas/Faqs';

export default function Home() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-red-50 text-gray-900'}`}>

      <Banner />
      <About />
      <Featured />
      <Benifits />
      <Testimonials />
      <Blood />
      <ConnectUs />
      <Faqs />
    </div>
  );
}
