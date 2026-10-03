import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/orders/my-orders"
        );

      setOrders(
        response.data.orders || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (
    status
  ) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Approved":
        return "bg-green-100 text-green-700";

      case "Packed":
        return "bg-purple-100 text-purple-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStepNumber = (
    status
  ) => {
    switch (status) {
      case "Pending":
        return 1;

      case "Approved":
        return 2;

      case "Packed":
        return 3;

      case "Delivered":
        return 4;

      default:
        return 1;
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6 mb-6">

          <h1 className="text-3xl font-bold text-green-600">
            My Orders
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-2">
            Track all your medicine orders.
          </p>

        </div>

        {loading ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
            Loading Orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
            No Orders Found
          </div>
        ) : (
          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">

                  <div>

                    <h2 className="text-xl font-bold dark:text-white">
                      {order.medicineName}
                    </h2>

                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                      Quantity: {order.quantity}
                    </p>

                    <p className="text-slate-600 dark:text-slate-300">
                      Amount: ₹{order.amount}
                    </p>

                    <p className="text-slate-600 dark:text-slate-300">
                      Payment Method: {order.paymentMethod}
                    </p>

                    <p className="text-slate-600 dark:text-slate-300">
                      Payment Status: {order.paymentStatus}
                    </p>

                    <p className="text-slate-600 dark:text-slate-300">
                      Order Type: {order.orderType}
                    </p>

                    <p className="text-slate-600 dark:text-slate-300">
                      Ordered On:{" "}
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>

                  </div>

                </div>

                {/* Order Timeline */}

                {order.orderStatus !==
                  "Cancelled" && (
                  <div className="mt-8">

                    <div className="flex items-center">

                      {/* Pending */}

                      <div className="flex flex-col items-center">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            getStepNumber(
                              order.orderStatus
                            ) >= 1
                              ? "bg-green-600"
                              : "bg-gray-300"
                          }`}
                        >
                          ✓
                        </div>

                        <span className="text-xs mt-2 dark:text-white">
                          Pending
                        </span>

                      </div>

                      <div
                        className={`flex-1 h-1 mx-2 ${
                          getStepNumber(
                            order.orderStatus
                          ) >= 2
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />

                      {/* Approved */}

                      <div className="flex flex-col items-center">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            getStepNumber(
                              order.orderStatus
                            ) >= 2
                              ? "bg-green-600"
                              : "bg-gray-300"
                          }`}
                        >
                          ✓
                        </div>

                        <span className="text-xs mt-2 dark:text-white">
                          Approved
                        </span>

                      </div>

                      <div
                        className={`flex-1 h-1 mx-2 ${
                          getStepNumber(
                            order.orderStatus
                          ) >= 3
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />

                      {/* Packed */}

                      <div className="flex flex-col items-center">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            getStepNumber(
                              order.orderStatus
                            ) >= 3
                              ? "bg-green-600"
                              : "bg-gray-300"
                          }`}
                        >
                          ✓
                        </div>

                        <span className="text-xs mt-2 dark:text-white">
                          Packed
                        </span>

                      </div>

                      <div
                        className={`flex-1 h-1 mx-2 ${
                          getStepNumber(
                            order.orderStatus
                          ) >= 4
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />

                      {/* Delivered */}

                      <div className="flex flex-col items-center">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            getStepNumber(
                              order.orderStatus
                            ) >= 4
                              ? "bg-green-600"
                              : "bg-gray-300"
                          }`}
                        >
                          ✓
                        </div>

                        <span className="text-xs mt-2 dark:text-white">
                          Delivered
                        </span>

                      </div>

                    </div>

                  </div>
                )}

                {order.orderStatus ===
                  "Cancelled" && (
                  <div className="mt-6">
                    <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                      ❌ This order was cancelled
                    </span>
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </AppLayout>
  );
}

export default Orders;