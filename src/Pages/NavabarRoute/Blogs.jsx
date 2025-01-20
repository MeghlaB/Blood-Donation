import React from 'react';
import AxiosSecure from '../../Components/Hooks/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Blogs() {
    const axiosSecure = AxiosSecure();

    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        },
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const publishedBlogs = data.filter(blog => blog.status === 'published');

    return (
        <div className='mt-16 px-6'>
            <h1 className='text-2xl font-bold mb-6'>Published Blogs</h1>

            {publishedBlogs && publishedBlogs.length > 0 ? (
                <div className='space-y-4'>
                    {publishedBlogs.map((blog) => (
                        <div key={blog._id} className='border p-4 rounded-lg shadow-lg'>
                            <h2 className='text-xl font-semibold'>{blog.title}</h2>
                            <div
                                className="blog-content"
                                dangerouslySetInnerHTML={{ __html: blog?.content }}
                            />
                            <Link to={`/blogs/${blog._id}`} className='text-blue-600 underline mt-2 inline-block'>
                                Details
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No published blogs found.</p>
            )}
        </div>
    );
}
