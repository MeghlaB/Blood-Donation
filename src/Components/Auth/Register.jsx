import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_ImageBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
export default function Register() {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm(); // Call useForm properly
    const navigate = useNavigate()
    const onSubmit =  async (data) => {
        console.log(data)
        

    };
    return (
        <div className="mx-auto w-full max-w-md mt-20 space-y-4 rounded-lg border bg-white p-10 shadow-lg">
        <h1 className="text-3xl font-semibold">Blood Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2 text-sm text-zinc-700">
                <label htmlFor="name" className="block font-medium">
                    Name
                </label>
                <input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
                    placeholder="Enter your name"
                    type="text"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
    
            {/* Image Field */}
            <div className="space-y-2 text-sm text-zinc-700">
                <label htmlFor="photo" className="block font-medium">
                    Photo
                </label>
                <input
                    id="photo"
                    {...register("photo", { required: "Photo is required" })}
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
                    placeholder="Enter your photo URL"
                    type="url"
                />
                {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
            </div>
    
            {/* Email Field */}
            <div className="space-y-2 text-sm text-zinc-700">
                <label htmlFor="email" className="block font-medium">
                    Email
                </label>
                <input
                    id="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
                    placeholder="Enter your email"
                    type="email"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
    
            {/* Password Field */}
            <div className="space-y-2 text-sm text-zinc-700">
                <label htmlFor="password" className="block font-medium">
                    Password
                </label>
                <input
                    id="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
                    placeholder="Enter your password"
                    type="password"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
    
            {/* Confirm Password Field */}
            <div className="space-y-2 text-sm text-zinc-700">
                <label htmlFor="confirmPassword" className="block font-medium">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                            value === watch("password") || "Passwords do not match",
                    })}
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1"
                    placeholder="Confirm your password"
                    type="password"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500">{errors.confirmPassword.message}</p>
                )}
            </div>
    
            {/* Submit Button */}
            <div>
                <input
                    type="submit"
                    className="btn w-full btn-primary"
                    value="Sign Up"
                />
            </div>
        </form>
    
        <p className="text-center text-sm text-zinc-700">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline text-blue-500">
                Sign In
            </Link>
        </p>
    </div>
    



    )
}
