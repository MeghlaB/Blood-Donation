import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery, useMutation } from '@tanstack/react-query';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';

export default function ContentManagement() {
  const axiosSecure = AxiosSecure();
  const [filter, setFilter] = useState('all');

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogsfilter', filter], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogsfilter?status=${filter}`);
      return res.data;
    },
  });

  // voluteer status to 'draft'
  const handleSetToDraft = (blogId) => {
    axiosSecure
      .patch(`/bloges/${blogId}`, { status: 'draft' })
      .then((response) => {
        Swal.fire('Success', response.data.message, 'success');
      })
      .catch((error) => {
        Swal.fire('Error', error.response?.data?.message || 'Failed to update status', 'error');
      });
  };

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-4">Loading blogs...</p>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Add Blog Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <Link to="add-blog">
          <button className="btn bg-blue-600 text-white">Add Blog</button>
        </Link>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 font-medium">
          Filter by Status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog List */}
      <div>
        {blogs.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">{blog.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {blog.status !== 'draft' && (
                      <button
                        className="btn btn-sm bg-yellow-600 text-white"
                        onClick={() => handleSetToDraft(blog._id)}
                      >
                        Set to Draft
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
