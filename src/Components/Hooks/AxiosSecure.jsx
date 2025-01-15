import axios from 'axios'
import React from 'react'

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})

export default function AxiosSecure() {
  return axiosSecure
}
