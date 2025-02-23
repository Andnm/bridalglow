import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  RiseOutlined, 
  UserOutlined, 
  CreditCardOutlined, 
  LineChartOutlined 
} from '@ant-design/icons';

// Dữ liệu mẫu để minh họa
const salesData = [
  { name: 'Tháng 1', total: 4000 },
  { name: 'Tháng 2', total: 3000 },
  { name: 'Tháng 3', total: 5000 },
  { name: 'Tháng 4', total: 4500 },
  { name: 'Tháng 5', total: 6000 },
  { name: 'Tháng 6', total: 5500 },
];

// Component thẻ số liệu
const MetricCard = ({ icon, title, value, trend }) => (
  <div className="bg-white shadow rounded-lg p-4 border">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <span className="text-gray-400">{icon}</span>
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <p className="text-xs text-gray-500">{trend}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Phần tiêu đề */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Tổng quan</h1>
        <p className="text-gray-500">Thống kê kinh doanh của bạn</p>
      </div>

      {/* Các thẻ số liệu */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          icon={<RiseOutlined className="text-xl text-green-500" />}
          title="Tổng Doanh Thu"
          value="$45,231.89"
          trend="+20.1% so với tháng trước"
        />
        <MetricCard 
          icon={<UserOutlined className="text-xl text-blue-500" />}
          title="Khách Hàng"
          value="+2,350"
          trend="+180.1% tháng này"
        />
        <MetricCard 
          icon={<CreditCardOutlined className="text-xl text-purple-500" />}
          title="Đơn Hàng"
          value="+12,234"
          trend="+19% so với tháng trước"
        />
        <MetricCard 
          icon={<LineChartOutlined className="text-xl text-red-500" />}
          title="Lượt Truy Cập"
          value="573"
          trend="+201 so với tuần trước"
        />
      </div>

      {/* Biểu đồ doanh số */}
      <div className="bg-white shadow rounded-lg p-4 border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Doanh Số Hàng Tháng</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={salesData}>
            <XAxis dataKey="name" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;