import React, { useState } from 'react';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserEdit } from 'react-icons/fa';

export default function AllUsers() {
    const axiosSecure = AxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('')
    const [selectedStatus , setSelectedStatus] = useState('')

    // Fetch users
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

  
    const handleRoleChange = () => {
        console.log('Selected User:', selectedUser);
        console.log('Selected Role:', selectedRole);
    
        if (!selectedUser) {
            Swal.fire('Error', 'No user selected for role update.', 'error');
            return;
        }
        if (!selectedRole) {
            Swal.fire('Error', 'Please select a role before submitting.', 'error');
            return;
        }
        axiosSecure.patch(`/users/AdimnroleChange/${selectedUser._id}`, { role: selectedRole })
            .then((res) => {
                console.log(res.data);
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
    

    const handleBlockUnblock = () => {
        console.log('Selected User:',selectedUser)
        console.log('Selected Status:',selectedStatus)
        if(!selectedUser){
            Swal.fire('Error', 'No user selected for Status update.', 'error')
            return
        }
        if (!selectedStatus) {
            Swal.fire('Error', 'Please select a Staus before submitting.', 'error');
            return;
        }
        axiosSecure.put(`/users/status/${selectedUser._id}`, { status: selectedStatus })
        .then((res) => {
            console.log(res.data);
            if (res?.data?.message === 'Status updated successfully') {
                Swal.fire('Success', `Role updated to ${selectedRole}.`, 'success');
                setSelectedStatus('');  
                refetch();
            }
        })
        .catch((err) => {
            Swal.fire('Error', err.response?.data?.message || 'Failed to update role.', 'error');
        });
        
    };

    return (
        <div className="p-6 mt-12">
            <h1 className="text-2xl font-bold">All Users: {users.length}</h1>

            {/* Table with Users */}
            <div className="overflow-x-auto ">
                <table className="table ">
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
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role || 'User'}</td>
                                <td>
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="">
                                                <FaUserEdit />
                                            </div>
                                        </label>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                                            <select
                                                id="role"
                                                className="select select-bordered w-full max-w-xs"
                                                value={selectedRole}
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                            >
                                                <option disabled selected>
                                                    Select a role
                                                </option>
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
                                                    className="btn btn-primary w-full"
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
                                                <FaUserEdit />
                                            </div>
                                        </label>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                                            <select
                                                id="role"
                                                className="select select-bordered w-full max-w-xs"
                                                value={selectedStatus}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                            >
                                                <option disabled selected>
                                                    Select a role
                                                </option>
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
                                                    className="btn btn-primary w-full"
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
        </div>
    );
}
