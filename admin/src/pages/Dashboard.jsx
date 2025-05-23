import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

const Dashboard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  const chartData = dashData
    ? [
        { name: 'Products', value: dashData.qproducts },
        { name: 'Carts', value: dashData.qcarts },
        { name: 'Comments', value: dashData.qcomments }
      ]
    : []

  const pieColors = ['#4f46e5', '#16a34a', '#f59e0b'] // Customize as you wish

  return dashData && (
    <div className="m-5">
      {/* Bar Chart */}
      <div className="bg-white p-4 rounded border-2 border-gray-100 mb-5 w-full">
        <h2 className="text-lg font-semibold mb-4">Statistics Overview</h2>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded border-2 border-gray-100 mb-5 w-full">
        <h2 className="text-lg font-semibold mb-4">Proportional Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Latest users */}
      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-4 rounded-t border">
          <img src="" alt="" />
          <p className="font-medium text-lg">Latest users</p>
        </div>
        <div>
          <div className="pt-2 border border-t-0">
            {
              dashData.users.map((user, index) => (
                <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-200" key={index}>
                  <img className="rounded-full w-10 h-10" src={user.image} alt="" />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">{user.name}</p>
                    <p className="text-gray-700 text-xs md:text-md">{user.email}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
