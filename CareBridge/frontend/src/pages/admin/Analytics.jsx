import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import TopHeader from "../../components/TopHeader";
import api from "../../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Analytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalPharmacies: 0,
    totalMedicines: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get(
        "/admin/dashboard"
      );

      setStats({
        totalUsers:
          response.data.stats
            ?.totalUsers || 0,

        totalOrders:
          response.data.stats
            ?.totalOrders || 0,

        totalPharmacies:
          response.data.stats
            ?.totalPharmacies || 0,

        totalMedicines:
          response.data.stats
            ?.totalMedicines || 0,

        totalRevenue:
          response.data.stats
            ?.totalRevenue || 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const barData = [
    {
      name: "Users",
      value: stats.totalUsers,
    },
    {
      name: "Pharmacies",
      value: stats.totalPharmacies,
    },
    {
      name: "Orders",
      value: stats.totalOrders,
    },
    {
      name: "Medicines",
      value: stats.totalMedicines,
    },
  ];

  const pieData = [
    {
      name: "Revenue",
      value:
        stats.totalRevenue || 0,
    },
    {
      name: "Orders",
      value:
        stats.totalOrders || 0,
    },
  ];

  const COLORS = [
    "#10B981",
    "#3B82F6",
  ];

  return (
    <AppLayout role="admin">
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6">

        <TopHeader />

        {/* Header */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-6">

          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Analytics Dashboard
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-1">
            Monitor platform performance and activity.
          </p>

        </div>

        {loading ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 text-center">
            Loading Analytics...
          </div>
        ) : (
          <>
            {/* KPI Cards */}

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
                <h3 className="text-slate-500 text-sm">
                  Total Users
                </h3>

                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {stats.totalUsers}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
                <h3 className="text-slate-500 text-sm">
                  Total Pharmacies
                </h3>

                <p className="text-2xl font-bold text-orange-600 mt-2">
                  {stats.totalPharmacies}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
                <h3 className="text-slate-500 text-sm">
                  Total Orders
                </h3>

                <p className="text-2xl font-bold text-green-600 mt-2">
                  {stats.totalOrders}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
                <h3 className="text-slate-500 text-sm">
                  Total Medicines
                </h3>

                <p className="text-2xl font-bold text-purple-600 mt-2">
                  {stats.totalMedicines}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
                <h3 className="text-slate-500 text-sm">
                  Revenue
                </h3>

                <p className="text-2xl font-bold text-emerald-600 mt-2">
                  ₹{stats.totalRevenue}
                </p>
              </div>

            </div>

            {/* Charts */}

            <div className="grid lg:grid-cols-2 gap-6 mb-6">

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">

                <h2 className="text-xl font-semibold dark:text-white mb-4">
                  Platform Statistics
                </h2>

                <div className="h-80">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      data={barData}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />

                      <Bar
                        dataKey="value"
                        fill="#2563EB"
                      />
                    </BarChart>
                  </ResponsiveContainer>

                </div>

              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">

                <h2 className="text-xl font-semibold dark:text-white mb-4">
                  Revenue vs Orders
                </h2>

                <div className="h-80">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>

                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                      >
                        {pieData.map(
                          (
                            entry,
                            index
                          ) => (
                            <Cell
                              key={index}
                              fill={
                                COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />

            </PieChart>
            </ResponsiveContainer>

            </div>

            </div>

            </div>

            {/* Summary */}

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">

              <h2 className="text-2xl font-semibold dark:text-white mb-4">
                Platform Summary
              </h2>

              <ul className="space-y-3 text-slate-600 dark:text-slate-300">

                <li>
                  👥 Total Users:{" "}
                  <strong>
                    {stats.totalUsers}
                  </strong>
                </li>

                <li>
                  🏥 Total Pharmacies:{" "}
                  <strong>
                    {stats.totalPharmacies}
                  </strong>
                </li>

                <li>
                  📦 Total Orders:{" "}
                  <strong>
                    {stats.totalOrders}
                  </strong>
                </li>

                <li>
                  💊 Total Medicines:{" "}
                  <strong>
                    {stats.totalMedicines}
                  </strong>
                </li>

                <li>
                  💰 Total Revenue:{" "}
                  <strong>
                    ₹{stats.totalRevenue}
                  </strong>
                </li>

              </ul>

            </div>

            </>
            )}

            </div>
            </AppLayout>
            );
            }

export default Analytics;
                           