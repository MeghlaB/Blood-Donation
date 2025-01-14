import React from 'react'
import Header from '../../Common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../Common/Footer'

export default function MainLayout() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}
