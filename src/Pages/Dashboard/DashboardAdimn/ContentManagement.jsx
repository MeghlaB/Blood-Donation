import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import Swal from 'sweetalert2';

export default function ContentManagement() {
  const axiosSecure = AxiosSecure();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Fetch blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blogs');
      return res.data;
    },
  });

  // Mutation for updating blog status
  const updateBlogStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const updatedStatus = status === 'draft' ? 'published' : 'draft';
      await axiosSecure.patch(`/blogs/${id}`, { status: updatedStatus });
      return updatedStatus;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      Swal.fire('Success', 'Blog status updated successfully!', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update blog status', 'error');
    },
  });

  // Mutation for deleting a blog
  const deleteBlog = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to delete blog', 'error');
    },
  });

  // Handle publish/unpublish
  const handleStatusChange = (id, status) => {
    updateBlogStatus.mutate({ id, status });
  };

  // Handle delete blog
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This blog will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog.mutate(id);
      }
    });
  };

  const filteredBlogs = blogs.filter(
    (blog) => filter === 'all' || blog.status === filter
  );

  // Paginate the filtered blogs
  const totalPages = Math.ceil(filteredBlogs.length / pageSize);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <p>Loading...</p>;
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
        {paginatedBlogs.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBlogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {blog.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {blog.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    {blog.status === 'draft' ? (
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          handleStatusChange(blog._id, blog.status)
                        }
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          handleStatusChange(blog._id, blog.status)
                        }
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

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn btn-sm mx-1 ${currentPage === index + 1 ? 'bg-red-900 text-white hover:bg-red-900' : 'btn-outline'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
