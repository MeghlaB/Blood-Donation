import axios from 'axios'


const axiosPublic = axios.create({
    baseURL:'https://blood-donation-server-side-psi.vercel.app'
})

export default function AxiosPublic() {
  return axiosPublic
}
