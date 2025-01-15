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

    // Fetching users data
    const { data: users = [] ,refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            console.log(res.data);
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
    const usersPerPage = 5;
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

    // Block user
    // const handleBlock = async (userId) => {
    //     try {
    //         await axiosSecure.put(`/users/block/${userId}`);
    //         // Refresh state or reload users as needed
    //     } catch (error) {
    //         console.error('Error blocking user:', error);
    //     }
    // };

    // Unblock user
    // const handleUnblock = async (userId) => {
    //     try {
    //         await axiosSecure.put(`/users/unblock/${userId}`);
    //         // Refresh state or reload users as needed
    //     } catch (error) {
    //         console.error('Error unblocking user:', error);
    //     }
    // };

    // Make user a volunteer
    // const handleMakeVolunteer = async (userId) => {
    //     try {
    //         await axiosSecure.put(`/users/make-volunteer/${userId}`);
    //         // Refresh state or reload users as needed
    //     } catch (error) {
    //         console.error('Error making volunteer:', error);
    //     }
    // };

    // Make user an admin
    const handleMakeAdmin = async (user) => {
       axiosSecure.patch(`/users/admin/${user._id}`)
       .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            refetch()
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${user.name} is now Admin!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
       })
    };

    // Make user a donor
    // const handleMakeDonor = async (userId) => {
    //     try {
    //         await axiosSecure.put(`/users/make-donor/${userId}`);
    //         // Refresh state or reload users as needed
    //     } catch (error) {
    //         console.error('Error making donor:', error);
    //     }
    // };

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
                                        src={user.avatar}
                                        alt="Avatar"
                                        className="rounded-full w-12 h-12"
                                    />
                                </td>
                                <td className="px-4 py-2 border-b">{user.email}</td>
                                <td className="px-4 py-2 border-b">{user.name}</td>
                                <td>
                                    { user.role === 'admin' ? 'Admin' : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn">
                                        {user.role}
                                    </button>}
                                </td>
                                <td 
                                
                                className="px-4 py-2 border-b">{user.status}</td>
                                
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-4 py-2 border-b text-center">
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
