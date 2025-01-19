import React, { useState, useEffect } from 'react';
import AxiosSecure from '../../Components/Hooks/AxiosSecure';
import { Link } from 'react-router-dom';

const Funding = () => {
  const axiosSecure = AxiosSecure();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); 
    axiosSecure
      .get('/funds')
      .then((res) => {
        console.log('Funds API Response:', res.data);
        setFunds(res.data);
      })
      .catch((error) => {
        console.error('Error fetching funds:', error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  return (
    <div className="container mt-20 mx-auto">
      <h2 className="text-2xl font-bold text-center">Funding Page</h2>

      <div className="mt-4 text-center">
        <Link to="/givefund" className="btn btn-success">
          Give Fund
        </Link>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="text-center text-red-500">Loading funds...</div>
        ) : funds.length === 0 ? (
          <p className="text-center text-gray-500">No funding data available.</p>
        ) : (
          <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="px-4 py-2 border">Donor Name</th>
                <th className="px-4 py-2 border">Fund Amount</th>
                <th className="px-4 py-2 border">Funding Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {funds.map((fund) => (
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
    </div>
  );
};

export default Funding;
