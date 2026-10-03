import {
useEffect,
useState,
} from "react";
import {
  Search,
  MapPin,
  FileText,
  Bell,
  Package,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import TopHeader from "../../components/TopHeader";
import api from "../../services/api";

function Dashboard() {
  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const userName =
    currentUser?.name || "Guest";

  const [medicine, setMedicine] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState([]);
    const [selectedOrder, setSelectedOrder] =
  useState(null);

const [orderType, setOrderType] =
  useState("Pickup");
    const [location, setLocation] =
useState({
latitude: null,
longitude: null,
});
const [stats, setStats] =
  useState({
    orders: 0,
    prescriptions: 0,
    pharmacies: 0,
    notifications: 0,
  });

const fetchStats = async () => {
  try {
    const response =
      await api.get(
        "/customer-dashboard/stats"
      );

    setStats(
      response.data.stats || {
        orders: 0,
        prescriptions: 0,
        pharmacies: 0,
        notifications: 0,
      }
    );
  } catch (error) {
    console.error(
      "Failed to load dashboard stats",
      error
    );
  }
};

 const navigate = useNavigate();
  const searchMedicine = async () => {
    if (!medicine.trim()) {
      alert("Please enter a medicine name");
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
      "/search",
      {
      params: {
        medicine,
        latitude:
          location.latitude,
        longitude:
          location.longitude,
    },
  }
);



      setResults(
        response.data.results || []
      );
    } catch (error) {
      console.error(error);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude:
          position.coords.latitude,
        longitude:
          position.coords.longitude,
      });
    },
    (error) => {
      console.error(error);

      alert(
        "Please allow location access."
      );
    }
  );
}, []);
useEffect(() => {
  fetchStats();
}, []);
const placeOrder = async () => {
  try {
    await api.post("/orders", {
      pharmacy:
        selectedOrder.pharmacyId,

      medicineName:
        selectedOrder.medicine,

      quantity: 1,

      amount:
        selectedOrder.price,

      paymentMethod: "COD",

      orderType,
    });

    alert(
      "Order placed successfully ✅"
    );

    setSelectedOrder(null);

    fetchStats();

  } catch (error) {
    console.error(error);

    alert(
      error?.response?.data?.message ||
      "Failed to place order"
    );
  }
};
  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6 transition-all duration-300">
        <TopHeader />

        {/* Welcome */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            👋 Welcome {userName}
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-1">
            Manage medicines, prescriptions and pharmacies from one place.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

  <div
    onClick={() =>
      navigate("/orders")
    }
    className="cursor-pointer bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition-all"
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm text-slate-500">
        Orders
      </h3>

      <Package
        size={18}
        className="text-green-600"
      />
    </div>

    <p className="text-2xl font-bold text-green-600 mt-2">
      {stats.orders}
    </p>
  </div>

  <div
    onClick={() =>
      navigate(
        "/my-prescriptions"
      )
    }
    className="cursor-pointer bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition-all"
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm text-slate-500">
        Prescriptions
      </h3>

      <FileText
        size={18}
        className="text-green-600"
      />
    </div>

    <p className="text-2xl font-bold text-green-600 mt-2">
      {stats.prescriptions}
    </p>
  </div>

  <div
  onClick={() =>
navigate("/nearby-pharmacies")
}
    className="cursor-pointer bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition-all"
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm text-slate-500">
        Pharmacies
      </h3>

      <Store
        size={18}
        className="text-orange-600"
      />
    </div>

    <p className="text-2xl font-bold text-orange-600 mt-2">
      {stats.pharmacies}
    </p>
  </div>

  <div
    onClick={() =>
      navigate(
        "/notifications"
      )
    }
    className="cursor-pointer bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition-all"
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm text-slate-500">
        Notifications
      </h3>

      <Bell
        size={18}
        className="text-purple-600"
      />
    </div>

    <p className="text-2xl font-bold text-purple-600 mt-2">
      {stats.notifications}
    </p>
  </div>

</div>


        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5">
            <h2 className="text-xl font-semibold dark:text-white mb-2 flex items-center gap-2">
              <Search size={20} />
              Search Medicine
            </h2>

            <p className="text-slate-500 dark:text-slate-300">
              Find medicines across nearby pharmacies.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5">
            <h2 className="text-xl font-semibold dark:text-white mb-2 flex items-center gap-2">
              <MapPin size={20} />
              Nearby Pharmacies
            </h2>

            <p className="text-slate-500 dark:text-slate-300">
              Discover pharmacies near your location.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5">
            <h2 className="text-xl font-semibold dark:text-white mb-2 flex items-center gap-2">
              <FileText size={20} />
              Upload Prescription
            </h2>

            <p className="text-slate-500 dark:text-slate-300">
              Upload and track prescriptions.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5">
            <h2 className="text-xl font-semibold dark:text-white mb-2 flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </h2>

            <p className="text-slate-500 dark:text-slate-300">
              View updates and alerts.
            </p>
          </div>
        </div>

        {/* Search Medicine */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Search Medicine
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
                      <p className="text-sm text-slate-500 mb-3">
            {location.latitude
              ? "📍 Location detected"
              : "📍 Waiting for location access"}
          </p>
            <input
              type="text"
              placeholder="Enter medicine name..."
              value={medicine}
              onChange={(e) =>
                setMedicine(e.target.value)
              }
              className="flex-1 border rounded-lg px-4 py-3 bg-white dark:bg-slate-700 dark:text-white"
            />

            <button
              onClick={searchMedicine}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              {loading
                ? "Searching..."
                : "Search"}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Search Results
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">
                      Medicine
                    </th>

                    <th className="text-left p-3">
                      Pharmacy
                    </th>

                    <th className="text-left p-3">
                      City
                    </th>
                    <th className="text-left p-3">
                      Distance
                      </th>
                       
                      <th className="text-left p-3">
                      Delivery
                      </th>


                    <th className="text-left p-3">
                      Stock
                    </th>

                    <th className="text-left p-3">
                      Price
                    </th>
                    <th className="text-left p-3">
                      Prescription
                    </th>

                    <th className="text-left p-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {results.map(
                    (item, index) => (
                      <tr
                        key={index}
                        className="border-b"
                      >
                        <td className="p-3">
                          {item.medicine}
                        </td>

                        <td className="p-3">
                          {item.pharmacyName}
                        </td>

                        <td className="p-3">
                          {item.city}
                        </td>
                        <td className="p-3">
                          {item.distance
                            ? `${item.distance} km`
                            : "N/A"}
                        </td>

                        <td className="p-3">
                          {item.deliveryAvailable ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                              🚚 Available
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                              ❌ Pickup Only
                            </span>
                          )}
                        </td>

                        <td className="p-3">
                          {item.stock}
                        </td>

                        <td className="p-3">
                          ₹{item.price}
                        </td>
                        <td className="p-3">
                          {item.prescriptionRequired ? (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                              Required
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                              OTC
                            </span>
                          )}
                        </td>

                        <td className="p-3">
                          {item.prescriptionRequired ? (
                            <button
                              onClick={() =>
                                navigate(
                                  "/upload-prescription",
                                  {
                                    state: {
                                      medicine:
                                        item.medicine,
                                      pharmacyId:
                                        item.pharmacyId,
                                      pharmacyName:
                                        item.pharmacyName,
                                    },
                                  }
                                )
                              }
                              className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded"
                            >
                              Upload Prescription
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                setSelectedOrder(item)
                              }
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                            >
                              Buy Now
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Activity */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mt-6">

          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Dashboard Summary
          </h2>

          <ul className="space-y-3 text-slate-600 dark:text-slate-300">

            <li>
              📦 Total Orders:
              {" "}
              {stats.orders}
            </li>

            <li>
              📄 Total Prescriptions:
              {" "}
              {stats.prescriptions}
            </li>

            <li>
              🏥 Available Pharmacies:
              {" "}
              {stats.pharmacies}
            </li>

            <li>
              🔔 Unread Notifications:
              {" "}
              {stats.notifications}
            </li>

          </ul>
</div>
</div>
      {selectedOrder && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-6 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-4">
        Place Order
      </h2>

      <p>
        <strong>Medicine:</strong>{" "}
        {selectedOrder.medicine}
      </p>

      <p>
        <strong>Pharmacy:</strong>{" "}
        {selectedOrder.pharmacyName}
      </p>

      <p>
        <strong>Price:</strong> ₹
        {selectedOrder.price}
      </p>

      <div className="mt-4">

        <label className="block mb-2">
          Order Type
        </label>

        <select
          value={orderType}
          onChange={(e) =>
            setOrderType(
              e.target.value
            )
          }
          className="w-full border rounded-lg p-3"
        >
          <option value="Pickup">
            Pickup
          </option>

          {selectedOrder.deliveryAvailable && (
            <option value="Delivery">
              Delivery
            </option>
          )}

        </select>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={placeOrder}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Confirm
        </button>

        <button
          onClick={() =>
            setSelectedOrder(null)
          }
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}
    </AppLayout>
  );
}

export default Dashboard;