import React, { useEffect, useState } from "react";
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
  ResponsiveContainer,
} from "recharts";
import {
  RiseOutlined,
  UserOutlined,
  CreditCardOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import {
  getStatisticMonthly,
  getStatisticSale,
  getStatisticSaleMonth,
} from "../../services/statistic.services";
import { toast } from "react-toastify";
import SpinnerLoading from "../../components/loading/SpinnerLoading";
import { Spin } from "antd";
import { getAllTransactionByAdmin } from "../../services/transaction.services";
import { list_services_wedding } from "../../utils/constants";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import { BiUser } from "react-icons/bi";
import { AiOutlineRise } from "react-icons/ai";
import { newFormatPrice } from "../../utils/common";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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
  const [isLoading, setIsLoading] = useState(false);
  const [salesDataByMonth, setSalesDataByMonth] = useState([]);
  const [multiLineData, setMultiLineData] = useState([]);
  const [topServicesData, setTopServicesData] = useState([]);
  const [salesStatisticData, setSalesStatisticData] = useState({});
  const [salesStatisticMonthData, setSalesStatisticMonthData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const salesStatisticDataResponse = await getStatisticSale();
        const salesStatisticMonthDataResponse = await getStatisticSaleMonth();
        const statisticMonthlyDataResponse = await getStatisticMonthly(2025);
        const transactionsResponse = await getAllTransactionByAdmin();

        setSalesStatisticData(salesStatisticDataResponse);
        setSalesStatisticMonthData(salesStatisticMonthDataResponse);

        const servicesMap = list_services_wedding.reduce((map, service) => {
          map[service.id] = service.name;
          return map;
        }, {});

        const serviceCountMap = transactionsResponse.reduce(
          (countMap, transaction) => {
            transaction.service_id.forEach((serviceId) => {
              if (servicesMap[serviceId]) {
                countMap[serviceId] = (countMap[serviceId] || 0) + 1;
              }
            });
            return countMap;
          },
          {}
        );

        const updatedTopServicesData = list_services_wedding
          .map((service) => {
            const count = serviceCountMap[service.id] || 0;
            return {
              name: service.name,
              value: count,
            };
          })
          .filter((service) => service.value > 0);

        setTopServicesData(updatedTopServicesData);

        //doanh số và count số lượng người dùng + giao dịch

        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
          name: `Tháng ${index + 1}`,
          total: statisticMonthlyDataResponse.totalAmount[index],
          customers: statisticMonthlyDataResponse.countCustomers[index],
          artists: statisticMonthlyDataResponse.countArtists[index],
          transactions: statisticMonthlyDataResponse.countTransactions[index],
        }));

        setSalesDataByMonth(
          monthlyData.map((month) => ({
            name: month.name,
            total: month.total,
          }))
        );

        setMultiLineData(
          monthlyData.map((month) => ({
            name: month.name,
            customers: month.customers,
            artists: month.artists,
            transactions: month.transactions,
          }))
        );
      } catch (error) {
        toast.error("There was an error loading data!");
        console.error("There was an error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return isLoading ? (
    <div
      style={{ margin: "24px 16px 0", minHeight: "calc(100vh - 165px)" }}
      className="flex justify-center items-center"
    >
      <Spin spinning={isLoading} />
    </div>
  ) : (
    <div className="p-6 space-y-2">
      <>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">General</h1>
        </div>
        <h2 className="text-lg font-bold text-gray-800">By day</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<AiOutlineRise className="text-xl text-green-500" />}
            title="Revenue"
            value={`${newFormatPrice(
              salesStatisticData?.income?.totalIncomeCurrent
            )} VNĐ`}
            trend={`${salesStatisticData?.income?.differencePercent >= 0
                ? `+ ${salesStatisticData?.income?.differencePercent} compared to yesterday`
                : `- ${salesStatisticData?.income?.differencePercent} compared to yesterday`
              }`}
          />
          <MetricCard
            icon={<BiUser className="text-xl text-blue-500" />}
            title="Customer"
            value={`${salesStatisticData?.newCustomerDifferencePercent?.totalNewCustomerCurrent}`}
            trend={`${salesStatisticData?.newCustomerDifferencePercent
                ?.differencePercent >= 0
                ? `+ ${salesStatisticData?.newCustomerDifferencePercent?.totalNewCustomerCurrent} compared to yesterday`
                : `- ${salesStatisticData?.newCustomerDifferencePercent?.totalNewCustomerCurrent} compared to yesterday`
              }`}
          />
          <MetricCard
            icon={<FaPersonDotsFromLine className="text-xl text-purple-500" />}
            title="Artist"
            value={`${salesStatisticData?.newArtistDifferencePercent?.totalNewArtistCurrent}`}
            trend={`${salesStatisticData?.newArtistDifferencePercent
                ?.differencePercent >= 0
                ? `+ ${salesStatisticData?.newArtistDifferencePercent?.totalNewArtistCurrent} compared to yesterday`
                : `- ${salesStatisticData?.newArtistDifferencePercent?.totalNewArtistCurrent} compared to yesterday`
              }`}
          />
        </div>
        <h2 className="text-lg font-bold text-gray-800">By month</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<AiOutlineRise className="text-xl text-green-500" />}
            title="Revenue"
            value={`${newFormatPrice(
              salesStatisticMonthData?.income?.totalIncomeCurrent
            )} VNĐ`}
            trend={`${salesStatisticMonthData?.income?.differencePercent
              } compared to last month`}
          />
          <MetricCard
            icon={<BiUser className="text-xl text-blue-500" />}
            title="Customer"
            value={`${salesStatisticMonthData?.newCustomers?.totalNewCustomerCurrent}`}
            trend={`${salesStatisticMonthData?.newCustomers?.differencePercent >= 0
                ? `+ ${salesStatisticMonthData?.newCustomers?.totalNewCustomerCurrent} compared to last month`
                : `- ${salesStatisticMonthData?.newCustomers?.totalNewCustomerCurrent} compared to last month`
              }`}
          />
          <MetricCard
            icon={<FaPersonDotsFromLine className="text-xl text-purple-500" />}
            title="Artist"
            value={`${salesStatisticMonthData?.newArtists?.totalNewArtistCurrent}`}
            trend={`${salesStatisticMonthData?.newArtists?.differencePercent >= 0
                ? `+ ${salesStatisticMonthData?.newArtists?.totalNewArtistCurrent} compared to last month`
                : `- ${salesStatisticMonthData?.newArtists?.totalNewArtistCurrent} compared to last month`
              }`}
          />
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800">Chart</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Biểu đồ doanh số */}
          <div className="bg-white shadow rounded-lg p-4 border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly Revenue
            </h2>
            <ResponsiveContainer SalesContainer width="100%" height={350}>
              <BarChart data={salesDataByMonth}>
                <XAxis dataKey="name" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow rounded-lg p-4 border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Top Selling Services
            </h2>
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
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {topServicesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                {/* <Legend
                  layout="vertical"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ marginTop: '100px' }} /> */}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Number of Users & Transactions
          </h2>
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
              <Line type="monotone" dataKey="artists" stroke="#82ca9d" />
              <Line type="monotone" dataKey="transactions" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    </div>
  );
};

export default Dashboard;
