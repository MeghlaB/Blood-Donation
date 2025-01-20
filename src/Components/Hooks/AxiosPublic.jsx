import axios from 'axios'


const axiosPublic = axios.create({
    baseURL:'https://blood-donation-server-side-psi.vercel.app'
    // baseURL:'http://localhost:5000'
})

export default function AxiosPublic() {
  return axiosPublic
}
