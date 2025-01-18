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
      <main>
        <Outlet />
      </main>
      {/* Footer শুধুমাত্র ড্যাশবোর্ড রুটে বাদ দিন */}
      {!isDashboardRoute && <Footer />}
    </div>
     
   
  )
}
