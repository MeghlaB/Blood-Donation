import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
    baseURL:'https://blood-donation-server-side-psi.vercel.app'
    // baseURL:'http://localhost:5000'
})

export default function AxiosSecure() {
  const navigate = useNavigate();
    const { signout} = UseAuth();

    
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await signout();
            navigate('/login');
        }
        return Promise.reject(error);
    })

  return axiosSecure
}
