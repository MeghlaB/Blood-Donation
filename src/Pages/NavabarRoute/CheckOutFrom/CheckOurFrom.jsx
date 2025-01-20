import React, { useState, useEffect } from 'react';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import UseAuth from '../../../Components/Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';

const CheckOurForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = AxiosSecure();
  const navigate = useNavigate();
  
  const { user } = UseAuth();
  
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (!stripe || !elements) {
      setError('Stripe is not loaded yet.');
      return;
    }

    // Get Card Element
    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card information is missing.');
      return;
    }

    try {
    
      const response = await axiosSecure.post('/create-payment-intent', {
        amount: parsedAmount * 100,
      });

      if (response.data?.clientSecret) {
        setClientSecret(response.data.clientSecret);

        // Confirm Card Payment
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          response.data.clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous',
              },
            },
          }
        );

        if (stripeError) {
          console.error('Error:', stripeError);
          setError(stripeError.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: stripeError.message,
          });
        } else {
          if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            setTransactionDate(new Date(paymentIntent.created * 1000).toLocaleString());
            // Now save the payment in the database
            const Fundling = {
              email: user?.email,
              name: user?.displayName,
              transactionId: paymentIntent.id,
              amount: paymentIntent.amount / 100, 
              date: new Date(),
            };

            const res = await axiosSecure.post('/funds', Fundling);
            // console.log('Payment saved:', res.data);
            if (res.data?.acknowledged) {
              await Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Thank you for Funding',
                showConfirmButton: false,
                timer: 1500,
              });
              navigate('/funding'); 
              
            }
           
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='border-2 p-6 bg-base-100 border-red-900'>
      <div>
        <label htmlFor="amount ">Funding Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!amount || !stripe || !elements}
      >
        Pay
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
      {transactionDate && <p className="text-blue-600">Payment Date: {transactionDate}</p>}
    </form>
  );
};

export default CheckOurForm;
