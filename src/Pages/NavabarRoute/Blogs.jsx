import React, { useEffect } from 'react';
import AxiosSecure from '../../Components/Hooks/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import DOMPurify from 'dompurify';

export default function Blogs() {
    const axiosSecure = AxiosSecure();

    const { data: blog, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blog');
            return res.data;
        },
    });

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);

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
                <button
                    onClick={refetch}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="mt-16 px-6 mb-7">
            <h1 className="text-2xl font-bold mb-6 pt-10 text-red-900 text-center underline">
                Published Blogs
            </h1>
            {blog && blog.length > 0 ? (
                <div
                    className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 lg:px-0"
                    data-aos="zoom-in-right"
                >
                    {blog.map((blog) => (
                        <div
                            key={blog._id}
                            className="border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            <h2 className="text-xl font-semibold">{blog.title}</h2>
                            <div
                                className="blog-content mt-2 text-sm text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(blog?.content?.slice(0, 100) + '...'),
                                }}
                            />
                            <Link
                                to={`/blogs/${blog._id}`}
                                className="text-blue-600 underline mt-2 inline-block"
                                aria-label={`Read more about ${blog.title}`}
                            >
                                Details
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No published blogs found.</p>
            )}
        </div>
    );
}
