import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function PharmacyPrescriptions() {
  const [prescriptions, setPrescriptions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/prescriptions"
      );

      setPrescriptions(
        response.data.prescriptions || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const approvePrescription = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Approve this prescription?"
      );

    if (!confirmed) return;

    try {
      await api.put(
        `/prescriptions/approve/${id}`
      );

      alert(
        "Prescription Approved ✅"
      );

      fetchPrescriptions();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to approve prescription"
      );
    }
  };

  const rejectPrescription = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Reject this prescription?"
      );

    if (!confirmed) return;

    try {
      await api.put(
        `/prescriptions/reject/${id}`
      );

      alert(
        "Prescription Rejected ❌"
      );

      fetchPrescriptions();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to reject prescription"
      );
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6 transition-all duration-300">

        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Prescription Review
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden">

          {loading ? (
            <div className="p-6 text-center dark:text-white">
              Loading prescriptions...
            </div>
          ) : prescriptions.length === 0 ? (
            <div className="p-6 text-center dark:text-white">
              No prescriptions found.
            </div>
          ) : (
            <table className="w-full text-slate-900 dark:text-white">

              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  <th className="p-4 text-left">
                    Patient
                  </th>

                  <th className="p-4 text-left">
                    Medicine
                  </th>

                  <th className="p-4 text-left">
                    File
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Reviewed At
                  </th>

                  <th className="p-4 text-left">
                    Remarks
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {prescriptions.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                  >
                    {/* Patient */}
                    <td className="p-4">
                      <div>
                        <p className="font-semibold">
                          {item.patient?.name ||
                            "Unknown"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {item.patient?.email}
                        </p>
                      </div>
                    </td>

                    {/* Medicine */}
                    <td className="p-4">
                      {item.medicine}
                    </td>
                    {/* Prescription File */}
                    <td className="p-4">
                      {item.fileUrl ? (
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View File
                        </a>
                      ) : (
                        <span className="text-slate-500">
                          No File
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {item.status ===
                      "Approved" ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          Approved
                        </span>
                      ) : item.status ===
                        "Rejected" ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                          Rejected
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Reviewed Time */}
                    <td className="p-4">
                      {item.approvedAt
                        ? new Date(
                            item.approvedAt
                          ).toLocaleString()
                        : "-"}
                    </td>

                    {/* Remarks */}
                    <td className="p-4">
                      {item.remarks || "-"}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      {item.status ===
                      "Pending" ? (
                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              approvePrescription(
                                item._id
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              rejectPrescription(
                                item._id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Reject
                          </button>

                        </div>
                      ) : (
                        <span className="text-slate-500">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default PharmacyPrescriptions;