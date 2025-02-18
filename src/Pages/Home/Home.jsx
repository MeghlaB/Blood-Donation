import React from 'react'
import Header from '../../Common/Header'
import Banner from './Banner/Banner'
import Featured from './Featured/Featured'
import ConnectUs from './ConntectUs/ConntectUs'
import Benifits from './Benifits/Benifits'
import Blood from './Blood'
import About from './About/About'
import Testimonials from './Testimonials/Testimonials'
import Faqs from './Fqas/Faqs'

export default function Home() {
  return (
    <div className='bg-red-50 '>
      <Banner></Banner>
      <About></About>
      <Featured></Featured>
      <Benifits></Benifits>
      <Testimonials></Testimonials>
      <Blood></Blood>
      <ConnectUs></ConnectUs>
      <Faqs></Faqs>
    </div>
  )
}
