import React, { useContext } from 'react';
import UseAuth from '../../../Components/Hooks/UseAuth';
import Marquee from 'react-fast-marquee';
import { FaDonate, FaHospital, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ThemeContext } from '../../../Context/ThemeProvider';

const CustomTooltip = ({ active, payload, label, data }) => {
  if (active && payload && payload.length) {
    const { name, value, fill } = payload[0].payload;
    const total = data.reduce((sum, item) => sum + item.value, 0); 
    const percentage = ((value / total) * 100).toFixed(2); 
    
    return (
      <div className="custom-tooltip bg-white p-4 rounded-lg shadow-md">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-lg">{`Value: ${value}`}</p>
        <p className="text-sm text-gray-500">{`Color: {fill}`}</p>
        <p className="text-sm">{`Percentage: ${percentage}%`}</p> 
      </div>
    );
  }
  return null;
};

export default function AdminHome() {
  const { theme } = useContext(ThemeContext);
  const { user } = UseAuth();
  const axiosSecure = AxiosSecure();
  
  const getBgClass = () => (theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900');
  const getCardBgClass = () => (theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800');
  
  const { data: stats, error, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get('/stats');
        return res.data;
      } catch (error) {
        throw new Error('Failed to fetch statistics');
      }
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const data = [
    {
      name: 'Total Donors',
      value: stats?.user,
      fill: "#82ca9d", 
    },
    {
      name: 'Total Funds',
      value: stats?.funding,
      fill: "#8884d8", 
    },
    {
      name: 'Total Blood Donation Requests',
      value: stats?.donarRequset,
      fill: "#ff7300", 
    },
  ];

  const barChartData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className={`${getBgClass()}`}>
      <div className={`mt-3 container mx-auto  ${getBgClass()}`}>
        <Marquee>
          <div className="p-8 mt-6 text-center rounded-lg w-full overflow-hidden bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-lg">
            {user?.displayName ? (
              <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-white">
                Welcome, <span className="text-red-600">{user.displayName}</span>!
              </h2>
            ) : (
              <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-white">Welcome, Donor!</h2>
            )}
            <p className="text-gray-200 mt-2 sm:text-lg lg:text-xl">
              Thank you for being a part of our donor community.
            </p>
          </div>
        </Marquee>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          <div className={`w-full shadow-lg rounded-lg p-6 flex items-center justify-between hover:scale-105 transform transition-all duration-300 ${getCardBgClass()}`}>
            <div className="text-center">
              <FaUsers className="lg:text-4xl text-3xl text-blue-500 mx-auto" />
              <div>
                <h3 className="mt-4 text-lg sm:text-xl font-semibold">Total Donors</h3>
                <p className="text-2xl font-bold">{stats?.user}</p>
              </div>
            </div>
          </div>

          <div className={`w-full shadow-lg rounded-lg p-6 flex items-center justify-between hover:scale-105 transform transition-all duration-300 ${getCardBgClass()}`}>
            <div className="text-center">
              <FaDonate className="lg:text-4xl text-3xl text-green-500 mx-auto" />
              <div>
                <h3 className="mt-4 text-lg sm:text-xl font-semibold">Total Funds</h3>
                <p className="text-2xl font-bold">${stats?.funding}</p>
              </div>
            </div>
          </div>

          <div className={`w-full shadow-lg rounded-lg p-6 flex items-center justify-between hover:scale-105 transform transition-all duration-300 ${getCardBgClass()}`}>
            <div className="text-center">
              <FaHospital className="lg:text-4xl text-3xl text-red-500 mx-auto" />
              <div>
                <h3 className="mt-4 text-lg sm:text-xl font-semibold">Total Blood Donation Requests</h3>
                <p className="text-2xl font-bold">{stats?.donarRequset}</p>
              </div>
            </div>
          </div>
        </div>

       <div className={`-mb-4 pb-6`}>
       <div className={`mt-14 pb-6   rounded-lg shadow-md ${getCardBgClass()}`}>
          <h2 className="text-xl sm:text-2xl font-semibold text-center ">Donation Stats Overview (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={barChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip data={data} />} />
              <Legend />
              <Bar dataKey="pv" barSize={20} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
       </div>
      </div>
    </div>
  );
}
