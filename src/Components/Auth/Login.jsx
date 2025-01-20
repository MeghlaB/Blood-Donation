import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider'
import Swal from 'sweetalert2';

export default function Login() {

  const {donorUserLogin}=useContext(AuthContext)
  const navgate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log('Email:', email, 'Password:', password);

    donorUserLogin(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // console.log('User Signed In:', user);
            Swal.fire({
                title: "User Login !",
                icon: "success",
                draggable: true
              });
              navgate('/')
             
        })
       
};



  return (
    <div className="mx-auto w-full mb-52 max-w-md mt-20 space-y-4 rounded-lg border bg-white p-10 shadow-lg pb-8">
    <h1 className="text-3xl font-semibold">Sign In</h1>
    <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <label htmlFor="email" className="block font-medium">
                Email
            </label>
            <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                id="email"
                placeholder="Enter email"
                name="email"
                type="email"
                required
            />
        </div>
        {/* Password Field */}
        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <label htmlFor="password" className="block font-medium">
                Password
            </label>
            <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                id="password"
                placeholder="Enter password"
                name="password"
                type="password"
                required
            />
        </div>
        
        {/* Submit Button */}
        <div>
            <input
               
                className=" w-full btn bg-red-900 text-white hover:bg-red-900 border-none"
                type="submit"
                value="Sign In"
            />
        </div>
    </form>
    <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
        Don&apos;t have an account?{' '}
        <Link to={'/register'}>
            <span className="font-semibold underline text-blue-500">Signup</span>
        </Link>
    </p>
   
</div>
  )
}
