import React from 'react'
import heart from '/src/assets/Image/heart.png'
import health from '/src/assets/Image/health.jpeg'
import feal from '/src/assets/Image/feel.png'

function Benifits() {
  return (
    <div>
      <div className="container mx-auto p-6">
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Benefits of Donating Blood
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <div className='text-center'>
          <img src={heart}
          className='w-20 h-20 rounded-full mx-auto '
           alt='heart'></img>
          </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center ">Improves Heart Health</h3>
            <p className="text-gray-600">Regular blood donation helps reduce harmful iron levels in the body, which can promote a healthier heart.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <div className='text-center'>
          <img src={health}
          className='w-20 h-20 rounded-full mx-auto '
           alt='heart'></img>
          </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Health Check-Up</h3>
            <p className="text-gray-600">Each donation includes a free health screening to ensure you are fit and healthy. This can help in early detection of potential health issues.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <div className='text-center'>
          <img src={feal}
          className='w-20 h-20 rounded-full mx-auto '
           alt='heart'></img>
          </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center" >Feel Good Factor</h3>
            <p className="text-gray-600">Donating blood can boost your mood and provide a sense of purpose and contribution. It’s a rewarding experience that can enhance your emotional well-being.</p>
          </div>

         
        </div>
      </section>
    </div>
    </div>
  )
}

export default Benifits
