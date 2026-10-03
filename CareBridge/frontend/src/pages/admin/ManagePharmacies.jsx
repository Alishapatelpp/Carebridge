import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function ManagePharmacies() {
  const [pharmacies, setPharmacies] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const response = await api.get(
        "/admin/pharmacies"
      );

      setPharmacies(
        response.data.pharmacies || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deletePharmacy = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pharmacy?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/admin/pharmacies/${id}`
      );

      fetchPharmacies();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPharmacies =
    pharmacies.filter((pharmacy) => {
      const matchesSearch =
        pharmacy.pharmacyName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        pharmacy.ownerName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        pharmacy.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        pharmacy.licenseNumber
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCity =
        !city ||
        pharmacy.city === city;

      const matchesStatus =
        !status ||
        pharmacy.status?.toLowerCase() ===
          status.toLowerCase();

      return (
        matchesSearch &&
        matchesCity &&
        matchesStatus
      );
    });

  const uniqueCities = [
    ...new Set(
      pharmacies
        .map((p) => p.city)
        .filter(Boolean)
    ),
  ];

  return (
    <AppLayout role="admin">
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6">

        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            Manage Pharmacies
          </h1>

          <p className="text-slate-500 mt-2">
            View, search and manage all registered pharmacies.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-slate-500">
              Total Pharmacies
            </h3>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {pharmacies.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-slate-500">
              Approved
            </h3>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {
                pharmacies.filter(
                  (p) =>
                    p.status?.toLowerCase() ===
                    "approved"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-slate-500">
              Pending
            </h3>

            <p className="text-3xl font-bold text-orange-600 mt-2">
              {
                pharmacies.filter(
                  (p) =>
                    p.status?.toLowerCase() ===
                    "pending"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-slate-500">
              Rejected
            </h3>

            <p className="text-3xl font-bold text-red-600 mt-2">
              {
                pharmacies.filter(
                  (p) =>
                    p.status?.toLowerCase() ===
                    "rejected"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Search Pharmacy, Owner, Email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border rounded-xl p-3"
            />

            <select
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="border rounded-xl p-3"
            >
              <option value="">
                All Cities
              </option>

              {uniqueCities.map((city) => (
                <option
                  key={city}
                  value={city}
                >
                  {city}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="border rounded-xl p-3"
            >
              <option value="">
                All Status
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setCity("");
                setStatus("");
              }}
              className="bg-blue-600 text-white rounded-xl p-3"
            >
              Reset Filters
            </button>

          </div>

        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3 mb-6">

          <button
            onClick={() => setStatus("")}
            className="px-4 py-2 rounded-full bg-slate-200"
          >
            All
          </button>

          <button
            onClick={() =>
              setStatus("Approved")
            }
            className="px-4 py-2 rounded-full bg-green-100 text-green-700"
          >
            Approved
          </button>

          <button
            onClick={() =>
              setStatus("Pending")
            }
            className="px-4 py-2 rounded-full bg-orange-100 text-orange-700"
          >
            Pending
          </button>

          <button
            onClick={() =>
              setStatus("Rejected")
            }
            className="px-4 py-2 rounded-full bg-red-100 text-red-700"
          >
            Rejected
          </button>

        </div>

        {/* Pharmacy Cards */}
        <div className="grid gap-5">

          {filteredPharmacies.map((pharmacy) => (
            <div
              key={pharmacy._id}
              className="bg-white rounded-2xl shadow-md p-5"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                <div>
                  <h2 className="text-xl font-bold text-blue-600">
                    {pharmacy.pharmacyName}
                  </h2>

                  <p className="text-slate-500">
                    {pharmacy.email}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm mt-3 md:mt-0 ${
                    pharmacy.status?.toLowerCase() ===
                    "approved"
                      ? "bg-green-100 text-green-600"
                      : pharmacy.status?.toLowerCase() ===
                        "pending"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {pharmacy.status}
                </span>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

                <p>
                  <strong>Owner:</strong>{" "}
                  {pharmacy.ownerName}
                </p>

                <p>
                  <strong>City:</strong>{" "}
                  {pharmacy.city}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {pharmacy.phone}
                </p>

                <p>
                  <strong>License:</strong>{" "}
                  {pharmacy.licenseNumber}
                </p>

              </div>

              {pharmacy.status?.toLowerCase() ===
                "rejected" &&
                pharmacy.rejectionReason && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600">
                      <strong>
                        Rejection Reason:
                      </strong>{" "}
                      {pharmacy.rejectionReason}
                    </p>
                  </div>
                )}

              <div className="flex flex-wrap gap-3 mt-5">

                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                  View
                </button>

                <button
                  onClick={() =>
                    deletePharmacy(
                      pharmacy._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

          {filteredPharmacies.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center shadow">
              <p className="text-slate-500">
                No pharmacies found.
              </p>
            </div>
          )}

        </div>

      </div>
    </AppLayout>
  );
}

export default ManagePharmacies;