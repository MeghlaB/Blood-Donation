import React from 'react';
import { Link } from 'react-router-dom';

import errorPage from '../../public/error.json'
import Lottie from 'lottie-react';

export default function ErrorPages() {
    return (
        <div className="bg-base-200 h-screen flex mx-auto flex-col justify-center items-center px-6">
        <div className="flex justify-center items-center mx-auto lg:w-3/5">
          <Lottie 
            animationData={errorPage} 
            style={{ height: '400px', width: '400px' }} 
          />
        </div>
        <h1 className="text-2xl font-bold text-violet-700 mt-4">No Page Found!</h1>
        <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
      </div>









       
    );
}
