import React from 'react'
import Header from '../../Common/Header'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  )
}
