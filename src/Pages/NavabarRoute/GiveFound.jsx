import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import CheckOurFrom from './CheckOutFrom/CheckOurFrom'

const stripePromise = loadStripe (import.meta.env.VITE_STRIPE_KEY)
// console.log(stripePromise)
export default function GiveFound() {
  return (
    <div className='mt-48 w-1/2 mx-auto '>
     <Elements stripe={stripePromise}>
        <CheckOurFrom></CheckOurFrom>
     </Elements>
    </div>
  )
}
