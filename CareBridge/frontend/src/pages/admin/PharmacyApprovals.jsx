import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function PharmacyApprovals() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingPharmacies();
  }, []);

  const fetchPendingPharmacies = async () => {
    try {
      const response = await api.get(
        "/pharmacy-auth/pending"
      );

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

  const handleApprove = async (id) => {
    try {
      await api.put(
        `/pharmacy-auth/approve/${id}`
      );

      alert("✅ Pharmacy Approved");

      fetchPendingPharmacies();
    } catch (error) {
      console.error(error);

      alert("Failed to approve pharmacy");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt(
      "Enter rejection reason"
    );

    if (!reason) return;

    try {
      await api.put(
        `/pharmacy-auth/reject/${id}`,
        {
          reason,
        }
      );

      alert("❌ Pharmacy Rejected");

      fetchPendingPharmacies();
    } catch (error) {
      console.error(error);

      alert("Failed to reject pharmacy");
    }
  };

  return (
    <AppLayout role="admin">
      <div className="p-6">

        {/* Page Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-6">

          <h1 className="text-3xl font-bold text-blue-600">
            Pharmacy Approvals
          </h1>

          <p className="text-slate-500 mt-2">
            Review pending pharmacy applications and approve or reject them.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
            Loading pharmacy applications...
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          pharmacies.length === 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold">
                🎉 No Pending Applications
              </h2>

              <p className="text-slate-500 mt-2">
                All pharmacy applications
                have been reviewed.
              </p>
            </div>
          )}

        {/* Pharmacy Cards */}
        {!loading &&
          pharmacies.map((pharmacy) => (
            <div
              key={pharmacy._id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-6"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                <div>
                  <h2 className="text-2xl font-bold text-blue-600">
                    {pharmacy.pharmacyName}
                  </h2>

                  <p className="text-orange-500 font-semibold mt-1">
                    {pharmacy.status}
                  </p>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">

                  <button
                    onClick={() =>
                      handleApprove(
                        pharmacy._id
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleReject(
                        pharmacy._id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
                  >
                    Reject
                  </button>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">

                <div>
                  <strong>Owner:</strong>{" "}
                  {pharmacy.ownerName}
                </div>

                <div>
                  <strong>Email:</strong>{" "}
                  {pharmacy.email}
                </div>

                <div>
                  <strong>Phone:</strong>{" "}
                  {pharmacy.phone}
                </div>

                <div>
                  <strong>City:</strong>{" "}
                  {pharmacy.city}
                </div>

                <div>
                  <strong>Pincode:</strong>{" "}
                  {pharmacy.pincode}
                </div>

                <div>
                  <strong>License Number:</strong>{" "}
                  {pharmacy.licenseNumber}
                </div>

              </div>

            </div>
          ))}

      </div>
    </AppLayout>
  );
}

export default PharmacyApprovals;