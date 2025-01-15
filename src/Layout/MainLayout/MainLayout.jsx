import React from 'react'
import Header from '../../Common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../Common/Footer'

export default function MainLayout() {
  return (
    <div>
      <Header></Header>
     <div className='min-h-[calc(100vh-288px)]'>
     <Outlet></Outlet>
     </div>
      <div className=''>
      <Footer></Footer>
      </div>
    </div>
  )
}
