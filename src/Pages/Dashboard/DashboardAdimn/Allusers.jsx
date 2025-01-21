import React, { useState } from 'react';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { BsThreeDots } from 'react-icons/bs';

export default function AllUsers() {
  const axiosSecure = AxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  //  selected filter
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?status=${filter}`);
      return res.data;
    },
  });


  const filteredUsers = filter === 'all' ? users : users.filter(user => user.status === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

//  admin only role change
  const handleRoleChange = () => {
    if (!selectedUser || !selectedRole) {
      Swal.fire('Error', 'Please select a user and a role.', 'error');
      return;
    }
    axiosSecure.patch(`/users/AdimnroleChange/${selectedUser._id}`, { role: selectedRole })
      .then((res) => {
        if (res?.data?.message === 'Role updated successfully') {
          Swal.fire('Success', `Role updated to ${selectedRole}.`, 'success');
          setSelectedRole('');
          refetch();
        }
      })
      .catch((err) => {
        Swal.fire('Error', err.response?.data?.message || 'Failed to update role.', 'error');
      });
  };

//   block /unblock
  const handleBlockUnblock = () => {
    if (!selectedUser || !selectedStatus) {
      Swal.fire('Error', 'Please select a user and a status.', 'error');
      return;
    }
    axiosSecure.put(`/users/status/${selectedUser._id}`, { status: selectedStatus })
      .then((res) => {
        if (res?.data?.message === 'Status updated successfully') {
          Swal.fire('Success', `Status updated to ${selectedStatus}.`, 'success');
          setSelectedStatus('');
          refetch();
        }
      })
      .catch((err) => {
        Swal.fire('Error', err.response?.data?.message || 'Failed to update status.', 'error');
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Users: {users.length}</h1>

      {/* Filter by status */}
      <div className="mb-4">
        <label htmlFor="filterStatus" className="mr-2">Filter by Status</label>
        <select
          id="filterStatus"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-3 w-full rounded-md"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="block">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse">
          <thead>
            <tr>
              <th>No</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Role Action</th>
              <th>Status</th>
              <th>Status Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                <td>
                  <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role || 'User'}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="">
                        <BsThreeDots />
                      </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box -top-10 w-52 p-2 shadow">
                      <select
                        id="role"
                        className="select select-bordered w-full max-w-xs"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option disabled selected>Select a role</option>
                        <option value="donor">Donor</option>
                        <option value="admin">Admin</option>
                        <option value="volunteer">Volunteer</option>
                      </select>
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            handleRoleChange();
                          }}
                          className="btn bg-red-900 text-white hover:bg-red-900 w-full"
                        >
                          Submit
                        </button>
                      </div>
                    </ul>
                  </div>
                </td>
                <td>{user.status}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="">
                        <BsThreeDots />
                      </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box -top-10 w-52 shadow">
                      <select
                        id="status"
                        className="select select-bordered w-full max-w-xs"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option disabled selected>Select a status</option>
                        <option value="active">Active</option>
                        <option value="block">Block</option>
                        <option value="unblock">Unblock</option>
                      </select>
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            handleBlockUnblock();
                          }}
                          className="btn bg-red-900 text-white hover:bg-red-900 w-full"
                        >
                          Submit
                        </button>
                      </div>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
