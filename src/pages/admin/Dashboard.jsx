import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
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

// Dữ liệu mẫu cho biểu đồ đường
const multiLineData = [
  { 
    name: 'Tháng 1', 
    customers: 400, 
    artists: 240, 
    transactions: 240 
  },
  { 
    name: 'Tháng 2', 
    customers: 300, 
    artists: 139, 
    transactions: 221 
  },
  { 
    name: 'Tháng 3', 
    customers: 200, 
    artists: 380, 
    transactions: 229 
  },
  { 
    name: 'Tháng 4', 
    customers: 278, 
    artists: 390, 
    transactions: 200 
  },
  { 
    name: 'Tháng 5', 
    customers: 189, 
    artists: 480, 
    transactions: 218 
  },
  { 
    name: 'Tháng 6', 
    customers: 239, 
    artists: 380, 
    transactions: 250 
  },
];

// Dữ liệu mẫu cho biểu đồ tròn (Top dịch vụ)
const topServicesData = [
  { name: 'Thiết Kế Logo', value: 400 },
  { name: 'Minh Họa Nghệ Thuật', value: 300 },
  { name: 'Thiết Kế Web', value: 200 },
  { name: 'Chỉnh Sửa Ảnh', value: 150 },
  { name: 'Dịch Vụ Khác', value: 100 }
];

// Bảng màu cho biểu đồ tròn
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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

      {/* Phần biểu đồ */}
      <div className="grid md:grid-cols-2 gap-6">
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

        {/* Biểu đồ tròn Top Dịch Vụ */}
        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Dịch Vụ Bán Chạy</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={topServicesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {topServicesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                layout="vertical" 
                verticalAlign="bottom" 
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ đường */}
      <div className="bg-white shadow rounded-lg p-4 border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Số Lượng Người Dùng & Giao Dịch</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={multiLineData}>
            <XAxis dataKey="name" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="customers" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="artists" 
              stroke="#82ca9d" 
            />
            <Line 
              type="monotone" 
              dataKey="transactions" 
              stroke="#ffc658" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;