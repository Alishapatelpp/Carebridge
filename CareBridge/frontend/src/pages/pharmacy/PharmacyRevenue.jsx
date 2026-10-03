import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function PharmacyRevenue() {
  const [data, setData] =
    useState(null);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const response =
        await api.get(
          "/revenue/stats"
        );

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return (
      <AppLayout>
        <div className="p-6">
          Loading...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 min-h-screen bg-slate-100 dark:bg-slate-900">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Revenue Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
            <h3>Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">
              ₹{data.totalRevenue}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
            <h3>Paid Orders</h3>
            <p className="text-3xl font-bold">
              {data.totalOrders}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
            <h3>Average Order</h3>
            <p className="text-3xl font-bold">
              ₹
              {data.averageOrderValue}
            </p>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

export default PharmacyRevenue;