import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import { Link } from "react-router-dom";
import api from "../../services/api";

function PharmacyDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalInventory: 0,
    pendingPrescriptions: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get(
        "/dashboard/stats"
      );
      console.log(
  "Dashboard Response:",
  response.data
);

      setStats(response.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6 transition-all duration-300">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Pharmacy Dashboard
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

          <Link
            to="/inventory"
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              📦 Inventory
            </h2>

            <p className="text-3xl font-bold mt-4 text-slate-900 dark:text-white">
              {stats.totalInventory}
            </p>
          </Link>

          <Link
            to="/pharmacy-orders"
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              🛒 Orders
            </h2>

            <p className="text-3xl font-bold mt-4 text-slate-900 dark:text-white">
              {stats.totalOrders}
            </p>
          </Link>

          <Link
            to="/pharmacy-orders"
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              ⏳ Pending Orders
            </h2>

            <p className="text-3xl font-bold mt-4 text-orange-500">
              {stats.pendingOrders}
            </p>
          </Link>

          <Link
            to="/pharmacy-prescriptions"
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              📄 Prescriptions
            </h2>

            <p className="text-3xl font-bold mt-4 text-slate-900 dark:text-white">
              {stats.pendingPrescriptions}
            </p>
          </Link>

          <Link
            to="/pharmacy-revenue"
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              💰 Revenue
            </h2>

            <p className="text-3xl font-bold mt-4 text-green-600">
              ₹{stats.totalRevenue}
            </p>
          </Link>

        </div>
      </div>
    </AppLayout>
  );
}

export default PharmacyDashboard;