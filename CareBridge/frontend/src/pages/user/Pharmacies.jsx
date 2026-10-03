import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import TopHeader from "../../components/TopHeader";
import api from "../../services/api";

function Pharmacies() {
  const [pharmacies, setPharmacies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/pharmacies");

      setPharmacies(
        response.data.pharmacies || []
      );
    } catch (error) {
      console.error(
        "Error fetching pharmacies:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6">
        <TopHeader />

        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-md px-6 py-4 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-green-600 dark:text-green-400">
            Nearby Pharmacies
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-2">
            Discover pharmacies near your location and check their details.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 text-center">
            <p className="text-slate-600 dark:text-slate-300">
              Loading pharmacies...
            </p>
          </div>
        )}

        {/* No Data */}
        {!loading &&
          pharmacies.length === 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 text-center">
              <p className="text-slate-600 dark:text-slate-300">
                No pharmacies found.
              </p>
            </div>
          )}

        {/* Pharmacy Cards */}
        {!loading &&
          pharmacies.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pharmacies.map(
                (pharmacy) => (
                  <div
                    key={pharmacy._id}
                    className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 hover:border-green-200 dark:hover:border-green-500 transition-all duration-300"
                  >
                    <h2 className="text-2xl font-semibold dark:text-white">
                      {pharmacy.pharmacyName}
                    </h2>

                    <p className="mt-3 text-slate-500 dark:text-slate-300">
                      📍 City: {pharmacy.city}
                    </p>

                    <p className="mt-2 text-slate-500 dark:text-slate-300">
                      🏠 Address:{" "}
                      {pharmacy.address}
                    </p>

                    <p className="mt-2 text-slate-500 dark:text-slate-300">
                      📞 Phone:{" "}
                      {pharmacy.phone}
                    </p>

                    <p className="mt-2 text-slate-500 dark:text-slate-300">
                      👤 Owner:{" "}
                      {pharmacy.ownerName}
                    </p>

                    <p
                      className={`mt-3 font-semibold ${
                        pharmacy.status ===
                        "Approved"
                          ? "text-green-600"
                          : pharmacy.status ===
                            "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {pharmacy.status}
                    </p>

                    <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300">
                      View Details
                    </button>
                  </div>
                )
              )}
            </div>
          )}
      </div>
    </AppLayout>
  );
}

export default Pharmacies;