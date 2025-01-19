import React from 'react'
import Header from '../../Common/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../../Common/Footer'

export default function MainLayout() {
  const location =useLocation()
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  return (
    
        <div>
    
      {!isDashboardRoute && <Header/>}
      <main className='min-h-[calc(100vh-150px)]'>
        <Outlet />
      </main>
     
      {!isDashboardRoute && <Footer />}
    </div>
     
   
  )
}
