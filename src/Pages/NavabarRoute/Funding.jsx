import React, { useState } from 'react';
import AxiosSecure from '../../Components/Hooks/AxiosSecure';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Funding = () => {
  const axiosSecure = AxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data: funds = [], isLoading } = useQuery({
    queryKey: ['funds'],
    queryFn: async () => {
      const res = await axiosSecure('funds');
      return res.data;
    },
  });

  const totalPages = Math.ceil(funds.length / pageSize);

  const paginatedRequests = funds.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mt-20 mx-auto mb-40">
      <h2 className="text-2xl font-bold text-center text-red-900">Funding Page</h2>

      <div className="mt-4 text-center">
        <Link to="/givefund" className="btn btn-success">
          Give Fund
        </Link>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="text-center text-red-500">Loading funds...</div>
        ) : funds.length === 0 ? (
          <p className="text-center text-gray-500">No funding data available.</p>
        ) : (
          <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-blue-100 text-red-900">
              <tr>
                <th className="px-4 py-2 border">Donor Name</th>
                <th className="px-4 py-2 border">Fund Amount</th>
                <th className="px-4 py-2 border">Funding Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {paginatedRequests.map((fund) => (
                <tr key={fund._id}>
                  <td className="px-4 py-2 border">{fund?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">${fund?.amount || 0}</td>
                  <td className="px-4 py-2 border">
                    {new Date(fund?.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn btn-sm mx-1 ${
              currentPage === index + 1 ? 'bg-red-900 text-white hover:bg-red-900' : 'btn-outline'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Funding;
