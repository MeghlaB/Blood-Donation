import React from 'react'
import { Link } from 'react-router-dom'

export default function Banner() {
    return (
        <section class="relative bg-hero-pattern h-[650px] flex items-center justify-center bg-cover bg-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="relative z-10 text-white text-center">
          <h1 class="text-xl md:text-2xl lg:text-4xl font-bold">Donate Blood, Save Lives</h1>
          <div className='flex items-center gap-2 justify-center py-4'>
            <Link to={'/register'}><button className='btn bg-red-900 text-white hover:bg-red-900 border-none '>Join as a donor</button></Link>
            <Link to={'/searchDonars'}><button className='btn'>Search Donor</button></Link>
          </div>
        </div>
      </section>
      

    )
}
