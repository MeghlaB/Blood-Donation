import React from 'react'
import Header from '../../Common/Header'
import Banner from './Banner/Banner'
import Featured from './Featured/Featured'
import ConnectUs from './ConntectUs/ConntectUs'
import Benifits from './Benifits/Benifits'

export default function Home() {
  return (
    <div className='bg-red-50 '>
      <Banner></Banner>
      <Featured></Featured>
      <ConnectUs></ConnectUs>
      <Benifits></Benifits>
    </div>
  )
}
