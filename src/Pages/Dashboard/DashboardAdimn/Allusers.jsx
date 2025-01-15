import React, { useState } from 'react';
import UseAuth from '../../../Components/Hooks/UseAuth';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

export default function Allusers() {
    const { user } = UseAuth();
    const axiosSecure = AxiosSecure();

    // State for filtering and pagination
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5;

    // Fetching users data
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Filter users by status
    const filteredUsers = users.filter((user) => {
        if (statusFilter === 'active') return user.status === 'active';
        if (statusFilter === 'blocked') return user.status === 'blocked';
        return true; // Show all users if filter is "all"
    });

    // Pagination logic
    const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
    const currentUsers = filteredUsers.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

    // Handle page change for pagination
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    // Handle status filter change
    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    // Make user an admin
    const handleMakeAdmin = async (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: `${user.name} is now Admin!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <div className="p-6 mt-12">
            <h1 className="text-2xl font-bold">All Users: {filteredUsers.length}</h1>

            {/* Filter Dropdown */}
            <div className="mt-4">
                <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            {/* Table with Users */}
            <table className="min-w-full mt-6 table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Avatar</th>
                        <th className="px-4 py-2 border-b">Email</th>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Role</th>
                        <th className="px-4 py-2 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="px-4 py-2 border-b">
                                    <img
                                        src={user.avatar || '/default-avatar.png'}
                                        alt="Avatar"
                                        className="rounded-full w-12 h-12"
                                    />
                                </td>
                                <td className="px-4 py-2 border-b">{user.email}</td>
                                <td className="px-4 py-2 border-b">{user.name}</td>
                                <td className="px-4 py-2 border-b">
                                    {user.role === 'admin' ? (
                                        'Admin'
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-sm bg-blue-500 text-white"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td className="px-4 py-2 border-b">{user.status || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-4 py-2 border-b text-center">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
}
