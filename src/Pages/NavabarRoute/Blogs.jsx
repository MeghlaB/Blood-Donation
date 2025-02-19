import React, { useContext, useEffect, useState } from "react";
import AxiosSecure from "../../Components/Hooks/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Aos from "aos";
import DOMPurify from "dompurify";
import { ThemeContext } from "../../Context/ThemeProvider";

export default function Blogs() {
    const { theme } = useContext(ThemeContext);
    const axiosSecure = AxiosSecure();

    const getBgClass = () => (theme === "dark" ? "bg-slate-900 text-gray-100" : "bg-white text-gray-900");
    const getCardBgClass = () => (theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-base-200 text-gray-800");
    const getTextClass = () => (theme === "dark" ? "text-gray-200" : "text-gray-700");
    const getSubTextClass = () => (theme === "dark" ? "text-gray-400" : "text-gray-600");
    const getText = () => (theme === "dark" ? "text-gray-200" : "");

    const { data: blogs, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["blog"],
        queryFn: async () => {
            const res = await axiosSecure.get("/blog");
            return res.data;
        },
    });

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

 
    const sortedBlogs = blogs ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    if (isLoading) {
        return (
            <div className="text-center mt-20">
                <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-blue-600"></div>
                <p className="mt-4">Loading blogs...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center mt-20 text-red-500">
                <p>Error: {error.message}</p>
                <button onClick={refetch} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className={`mt-16 px-6 pb-20 ${getBgClass()}`}>
            <h1 className={`text-2xl font-bold mb-6 pt-10 text-center underline ${getText()}`}>Published Blogs</h1>
            {sortedBlogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 lg:px-0" data-aos="zoom-in-right">
                    {sortedBlogs.map((blog) => (
                        <div key={blog._id} className={`border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${getCardBgClass()} flex flex-col h-[250px]`}>
                            <h2 className={`text-xl font-semibold ${getTextClass()}`}>{blog.title}</h2>
                            <div className={`blog-content mt-2 text-sm flex-1 ${getSubTextClass()}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.content?.slice(0, 100) + "...") }} />
                            <Link to={`/blogs/${blog._id}`} className="text-blue-600 underline mt-2 inline-block">
                                Details
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">No published blogs found.</p>
            )}
        </div>
    );
}
