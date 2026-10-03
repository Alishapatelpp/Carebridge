import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function ManageOrders() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/admin/orders"
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

  const updateStatus = async (
    orderId,
    orderStatus
  ) => {
    const confirmed =
      window.confirm(
        `Change order status to ${orderStatus}?`
      );

    if (!confirmed) return;

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


  const filteredOrders =
    orders.filter((order) => {
      const matchesSearch =
        `
        ${order._id}
        ${order.user?.name || ""}
        ${order.pharmacy?.name || ""}
        ${order.medicineName || ""}
        `
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All"
          ? true
          : order.orderStatus ===
            statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <AppLayout role="admin">
      <div className="p-6">

        <div className="bg-white rounded-2xl shadow p-6 mb-6">

          <h1 className="text-3xl font-bold text-blue-600">
            Manage Orders
          </h1>

          <p className="text-slate-500 mt-2">
            Track and manage all customer orders.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-blue-50 rounded-2xl p-5">

            <h3 className="text-slate-500">
              Total Orders
            </h3>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {orders.length}
            </p>

          </div>

          <div>

            <input
              type="text"
              placeholder="Search customer, pharmacy, medicine..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Packed">
                Packed
              </option>

              <option value="Delivered">
                Delivered
              </option>

            </select>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">

          {loading ? (
            <div className="text-center py-10">
              Loading Orders...
            </div>
          ) : (
            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="p-3 text-left">
                    Order ID
                  </th>

                  <th className="p-3 text-left">
                    Customer
                  </th>

                  <th className="p-3 text-left">
                    Pharmacy
                  </th>

                  <th className="p-3 text-left">
                    Medicine
                  </th>

                  <th className="p-3 text-left">
                    Qty
                  </th>

                  <th className="p-3 text-left">
                    Amount
                  </th>

                  <th className="p-3 text-left">
                    Status
                  </th>

                  <th className="p-3 text-left">
                    Payment
                  </th>

                  <th className="p-3 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredOrders.map(
                  (order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-3 font-medium">
                        {order._id.slice(-6)}
                      </td>

                      <td className="p-3">
                        {order.user?.name ||
                          "Unknown Customer"}
                      </td>

                      <td className="p-3">
                        {order.pharmacy?.pharmacyName ||
                        order.pharmacy?.name ||
                          "N/A"}
                      </td>

                      <td className="p-3">
                        {order.medicineName}
                      </td>

                      <td className="p-3">
                        {order.quantity}
                      </td>

                      <td className="p-3">
                        ₹{order.amount}
                      </td>

                      <td className="p-3">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.orderStatus ===
                            "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.orderStatus ===
                                "Packed"
                              ? "bg-purple-100 text-purple-700"
                              : order.orderStatus ===
                                "Approved"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.orderStatus}
                        </span>

                      </td>

                      <td className="p-3">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.paymentStatus ===
                            "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>

                      </td>

                      <td className="p-3">

                        <div className="flex flex-wrap gap-2">

                          <button
                            disabled={
                              order.orderStatus ===
                              "Delivered"
                            }
                            onClick={() =>
                              updateStatus(
                                order._id,
                                "Approved"
                              )
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
                          >
                            Approve
                          </button>

                          <button
                            disabled={
                              order.orderStatus ===
                              "Delivered"
                            }
                            onClick={() =>
                              updateStatus(
                                order._id,
                                "Packed"
                              )
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
                          >
                            Packed
                          </button>

                          <button
                            disabled={
                              order.orderStatus ===
                              "Delivered"
                            }
                            onClick={() =>
                              updateStatus(
                                order._id,
                                "Delivered"
                              )
                            }
                            className="bg-emerald-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
                          >
                            Delivered
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

                {filteredOrders.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan="9"
                      className="text-center p-10 text-slate-500"
                    >
                      No orders found
                    </td>

                  </tr>
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </AppLayout>
  );
}

export default ManageOrders;