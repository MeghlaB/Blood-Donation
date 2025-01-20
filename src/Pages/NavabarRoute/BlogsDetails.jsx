import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosSecure from '../../Components/Hooks/AxiosSecure';

export default function BlogsDetails() {
  const { id } = useParams(); 
  // console.log(id); 
  const axiosSecure = AxiosSecure();
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axiosSecure.get(`/blog/${id}`)
      .then((res) => {
        // console.log(res.data); 
        if (res.data && Array.isArray(res.data)) {
          setBlogs(res.data[0]); 
        }
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="spinner-border animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!blogs) {
    return <div className="text-center mt-20 text-xl">Blog not found</div>; 
  }

  return (
    <div className='mt-20 container mx-auto my-12 py-12'>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <figure className="relative">
          <img
            src={blogs?.thumbnail}
            alt={blogs?.title}
            className="w-full h-72 object-cover rounded-t-lg"
          />
        </figure>
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{blogs?.title}</h2>
          <div
            className="blog-content text-gray-700 text-lg space-y-4"
            dangerouslySetInnerHTML={{ __html: blogs?.content }}
          />
        </div>
      </div>
    </div>
  );
}
