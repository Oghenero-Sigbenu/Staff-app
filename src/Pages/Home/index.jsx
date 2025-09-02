import { DashboardLayout } from "../../Components";
import TopMenuNav from "../../Components/Dashboard/TopNav";
import React, { useState } from "react";
import {
  FaPlane,
  FaUsers,
  FaCalendarCheck,
  FaDollarSign,
  FaChartLine,
  FaMapMarkerAlt,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  BiTrendingUp,
  BiTrendingDown,
  BiCalendar,
  BiUser,
  BiMapPin,
} from "react-icons/bi";
import { FiDownload, FiFilter, FiMoreVertical } from "react-icons/fi";
import { IoMdArrowForward } from "react-icons/io";

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("7days");

  // Sample data - replace with actual data from your Redux store
  const dashboardStats = {
    totalFlights: 247,
    totalPassengers: 892,
    completedFlights: 198,
    revenue: 24750000,
    trends: {
      flights: 12.5,
      passengers: 8.3,
      revenue: 15.2,
      completion: -2.1,
    },
  };

  const recentFlights = [
    {
      id: "1",
      bookingCode: "ABC123",
      route: "LON → YYC",
      passenger: "John Doe",
      departure: "2025-02-15T14:30:00",
      status: "COMPLETED",
      amount: 941716,
    },
    {
      id: "2",
      bookingCode: "DEF456",
      route: "NYC → PAR",
      passenger: "Jane Smith",
      departure: "2025-02-16T09:15:00",
      status: "PENDING",
      amount: 1245000,
    },
    {
      id: "3",
      bookingCode: "GHI789",
      route: "DXB → LOS",
      passenger: "Ahmed Hassan",
      departure: "2025-02-17T23:45:00",
      status: "CANCELLED",
      amount: 680000,
    },
  ];

  const popularRoutes = [
    { route: "London → Calgary", count: 45, percentage: 18.2 },
    { route: "New York → Paris", count: 38, percentage: 15.4 },
    { route: "Dubai → Lagos", count: 32, percentage: 13.0 },
    { route: "Lagos → London", count: 28, percentage: 11.3 },
    { route: "Toronto → Amsterdam", count: 24, percentage: 9.7 },
  ];

  const upcomingFlights = [
    { time: "09:30", route: "LON → YYC", flight: "BA245", passengers: 2 },
    { time: "14:15", route: "NYC → PAR", flight: "AF892", passengers: 1 },
    { time: "18:45", route: "DXB → LOS", flight: "EK501", passengers: 3 },
    { time: "22:30", route: "LOS → AMS", flight: "KL627", passengers: 1 },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    subtitle,
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
        {trend && (
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend === "up"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {trend === "up" ? <BiTrendingUp /> : <BiTrendingDown />}
            <span>{trendValue}%</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout className="bg-[#f9f9f9] text-center">
      <TopMenuNav TitleHeader="Dashboard" />
      <div className="w-[98%] mx-auto">
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Flight Management Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome back! Here's what's happening with your flights today.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="3months">Last 3 months</option>
                  <option value="year">This year</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FiDownload size={16} />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Flights"
                value={dashboardStats.totalFlights.toLocaleString()}
                icon={FaPlane}
                trend={dashboardStats.trends.flights > 0 ? "up" : "down"}
                trendValue={Math.abs(dashboardStats.trends.flights)}
                subtitle="Active bookings"
              />
              <StatCard
                title="Total Passengers"
                value={dashboardStats.totalPassengers.toLocaleString()}
                icon={FaUsers}
                trend={dashboardStats.trends.passengers > 0 ? "up" : "down"}
                trendValue={Math.abs(dashboardStats.trends.passengers)}
                subtitle="This period"
              />
              <StatCard
                title="Completed Flights"
                value={dashboardStats.completedFlights.toLocaleString()}
                icon={FaCalendarCheck}
                trend={dashboardStats.trends.completion > 0 ? "up" : "down"}
                trendValue={Math.abs(dashboardStats.trends.completion)}
                subtitle={`${(
                  (dashboardStats.completedFlights /
                    dashboardStats.totalFlights) *
                  100
                ).toFixed(1)}% completion rate`}
              />
              {/* <StatCard
                title="Total Revenue"
                value={formatCurrency(dashboardStats.revenue)}
                icon={FaDollarSign}
                trend={dashboardStats.trends.revenue > 0 ? "up" : "down"}
                trendValue={Math.abs(dashboardStats.trends.revenue)}
                subtitle="Gross revenue"
              /> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Flights */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Recent Flight Bookings
                    </h3>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      <span>View all</span>
                      <IoMdArrowForward size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentFlights.map((flight) => (
                      <div
                        key={flight.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FaPlane className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {flight.route}
                            </p>
                            <p className="text-sm text-gray-600">
                              {flight.passenger} • {flight.bookingCode}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(flight.departure).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(flight.amount)}
                          </p>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              flight.status
                            )}`}
                          >
                            {flight.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Popular Routes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Popular Routes
                  </h3>
                  <p className="text-sm text-gray-600">
                    Most booked destinations
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {popularRoutes.map((route, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {route.route}
                            </p>
                            <p className="text-xs text-gray-500">
                              {route.count} bookings
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">
                            {route.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Today's Schedule */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Today's Flight Schedule
                      </h3>
                      <p className="text-sm text-gray-600">
                        Upcoming departures
                      </p>
                    </div>
                    <FaClock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingFlights.map((flight, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 text-center">
                            <p className="text-lg font-bold text-gray-900">
                              {flight.time}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {flight.route}
                            </p>
                            <p className="text-sm text-gray-600">
                              {flight.flight}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <BiUser className="w-4 h-4" />
                          <span>{flight.passengers}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Actions
                  </h3>
                  <p className="text-sm text-gray-600">
                    Frequently used features
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                      <FaPlane className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-medium text-gray-900">New Booking</p>
                      <p className="text-xs text-gray-600">
                        Create flight booking
                      </p>
                    </button>

                    <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
                      <FaChartLine className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-medium text-gray-900">Analytics</p>
                      <p className="text-xs text-gray-600">
                        View detailed reports
                      </p>
                    </button>

                    <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
                      <FaUsers className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-medium text-gray-900">Customers</p>
                      <p className="text-xs text-gray-600">Manage passengers</p>
                    </button>

                    <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                      <FaMapMarkerAlt className="w-6 h-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-medium text-gray-900">Routes</p>
                      <p className="text-xs text-gray-600">
                        Manage destinations
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
