import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function PharmacyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");

      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    orderId,
    orderStatus
  ) => {
    try {
      await api.put(
        `/orders/status/${orderId}`,
        {
          orderStatus,
        }
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6 transition-all duration-300">

        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Pharmacy Orders
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden">

          <table className="w-full text-slate-900 dark:text-white">

            <thead className="bg-slate-200 dark:bg-slate-700">

              <tr>
                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Medicine
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Payment
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <td className="p-4">
                    {order.user?.name}
                  </td>

                  <td className="p-4">
                    {order.medicineName}
                  </td>

                  <td className="p-4">
                    {order.quantity}
                  </td>

                  <td className="p-4">
                    ₹{order.amount}
                  </td>

                  <td className="p-4">
                    {order.paymentStatus}
                  </td>

                  <td className="p-4">
                    {order.orderStatus}
                  </td>

                  <td className="p-4">

                    <div className="flex flex-wrap gap-2">

                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Approved"
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-all"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Cancelled"
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-all"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Packed"
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-all"
                      >
                        Packed
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Delivered"
                          )
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition-all"
                      >
                        Delivered
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-6 text-slate-600 dark:text-slate-300"
                  >
                    No Orders Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </AppLayout>
  );
}

export default PharmacyOrders;