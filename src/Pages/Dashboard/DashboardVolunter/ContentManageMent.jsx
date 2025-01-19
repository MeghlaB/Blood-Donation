import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import Swal from 'sweetalert2';

export default function ContentManagement() {
  const axiosSecure = AxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');

  // Fetch blogs
  useEffect(() => {
    axiosSecure.get('/blogs')
      .then((result) => {
        setBlogs(result.data);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  // Handle publish/unpublish
  const handleStatusChange = async (id, status) => {
    const updatedStatus = status === 'draft' ? 'published' : 'draft';
    try {
      await axiosSecure.patch(`/blogs/${id}`, { status: updatedStatus });
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === id ? { ...blog, status: updatedStatus } : blog
        )
      );
      Swal.fire('Success', `Blog ${updatedStatus} successfully!`, 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update blog status', 'error');
    }
  };

  // Handle delete blog
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This blog will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/blogs/${id}`);
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
          Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error', 'Failed to delete blog', 'error');
        }
      }
    });
  };

  // Filter blogs by status
  const filteredBlogs = blogs.filter(
    (blog) => filter === 'all' || blog.status === filter
  );

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
        <label htmlFor="filter" className="mr-2 font-medium">Filter by Status:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog List */}
      <div>
        {filteredBlogs.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">{blog.status}</td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    {blog.status === 'draft' ? (
                      <button
                        className="btn btn-success"
                        onClick={() => handleStatusChange(blog._id, blog.status)}
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => handleStatusChange(blog._id, blog.status)}
                      >
                        Unpublish
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
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
