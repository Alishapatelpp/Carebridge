import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import TopHeader from "../../components/TopHeader";
import api from "../../services/api";

import {
  Users,
  Store,
  Package,
  IndianRupee,
} from "lucide-react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalPharmacies: 0,
    totalMedicines: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get(
        "/admin/dashboard"
      );

      setStats(response.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppLayout role="admin">
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6">

        <TopHeader />

        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-md px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-1">
            Monitor users, pharmacies, orders, and platform performance.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* Users */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-500 text-sm">
                Users
              </h3>

              <Users
                size={18}
                className="text-green-600"
              />
            </div>

            <p className="text-2xl font-bold text-green-600 mt-2">
              {stats.totalUsers}
            </p>
          </div>

          {/* Pharmacies */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-500 text-sm">
                Pharmacies
              </h3>

              <Store
                size={18}
                className="text-orange-600"
              />
            </div>

            <p className="text-2xl font-bold text-orange-600 mt-2">
              {stats.totalPharmacies}
            </p>
          </div>

          {/* Orders */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-500 text-sm">
                Orders
              </h3>

              <Package
                size={18}
                className="text-green-600"
              />
            </div>

            <p className="text-2xl font-bold text-green-600 mt-2">
              {stats.totalOrders}
            </p>
          </div>

          {/* Medicines */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-500 text-sm">
                Medicines
              </h3>

              <IndianRupee
                size={18}
                className="text-purple-600"
              />
            </div>

            <p className="text-2xl font-bold text-purple-600 mt-2">
              {stats.totalMedicines}
            </p>
          </div>

        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-semibold dark:text-white mb-4">
            System Overview
          </h2>

          <ul className="space-y-3 text-slate-600 dark:text-slate-300">
            <li>
              ✅ {stats.totalUsers} registered users
            </li>

            <li>
              ✅ {stats.totalPharmacies} pharmacies
            </li>

            <li>
              ✅ {stats.totalOrders} orders
            </li>

            <li>
              ✅ {stats.totalMedicines} medicines
            </li>
          </ul>

        </div>

      </div>
    </AppLayout>
  );
}

export default AdminDashboard;