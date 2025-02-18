import React, { useContext, useEffect } from 'react';
import AxiosSecure from '../../Components/Hooks/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import DOMPurify from 'dompurify';
import { ThemeContext } from '../../Context/ThemeProvider';

export default function Blogs() {
    const { theme } = useContext(ThemeContext);

    const getBgClass = () => (theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900');
    const getCardBgClass = () => (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800');
    const getTextClass = () => (theme === 'dark' ? 'text-gray-200' : 'text-gray-700'); 
    const getSubTextClass = () => (theme === 'dark' ? 'text-gray-400' : 'text-gray-600');
    const getText = () => (theme === 'dark' ? 'text-gray-200' : '');

    const axiosSecure = AxiosSecure();

    const { data: blog, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blog');
            return res.data;
        },
    });

    // AOS initialization
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <div className="text-center mt-20">
                <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-blue-600"></div>
                <p className="mt-4">Loading blogs...</p>
            </div>
        );
    }

    // Error state
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
        <div className={`mt-16 px-6 pb-20 ${getBgClass()}`}>
            <h1 className={`text-2xl font-bold mb-6 pt-10 text-center underline ${getText()}`}>
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
                            className={`border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${getCardBgClass()}`}
                        >
                            <h2 className={`text-xl font-semibold ${getTextClass()}`}>{blog.title}</h2>
                            <div
                                className={`blog-content mt-2 text-sm ${getSubTextClass()}`}
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
