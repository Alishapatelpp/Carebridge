import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import TopHeader from "../../components/TopHeader";
import api from "../../services/api";

function UploadPrescription() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    medicine,
    pharmacyId,
    pharmacyName,
  } = location.state || {};

  const [file, setFile] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const handleFileChange = (e) => {
    const selectedFile =
      e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    if (
      selectedFile.type.includes(
        "image"
      )
    ) {
      setPreview(
        URL.createObjectURL(
          selectedFile
        )
      );
    } else {
      setPreview("");
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        alert(
          "Please select a prescription file"
        );
        return;
      }

      setUploading(true);

      await api.post(
        "/prescriptions",
        {
          medicine,
          pharmacyId,
          fileUrl:
            preview || file.name,
        }
      );

      alert(
        "Prescription uploaded successfully ✅"
      );

      setFile(null);
      setPreview("");

      navigate(
        "/my-prescriptions"
      );

    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data
          ?.message ||
          "Failed to upload prescription"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6">

        <TopHeader />

        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-md p-8">

          <h1 className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
            Upload Prescription
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mb-6">
            Upload your doctor's
            prescription for
            verification.
          </p>

          {/* Medicine Details */}

          <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-4 mb-6">

            <p className="mb-2 dark:text-white">
              <strong>
                Medicine:
              </strong>{" "}
              {medicine ||
                "Not Selected"}
            </p>

            <p className="dark:text-white">
              <strong>
                Pharmacy:
              </strong>{" "}
              {pharmacyName ||
                "Not Selected"}
            </p>

          </div>

          {/* Upload Area */}

          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center bg-slate-50 dark:bg-slate-700">

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={
                handleFileChange
              }
              className="mb-4 block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
            />

            <p className="text-slate-500 dark:text-slate-300">
              Supported formats:
              JPG, PNG, PDF
            </p>

          </div>

          {/* Preview */}

          {preview && (
            <div className="mt-6">

              <h3 className="font-semibold mb-3 dark:text-white">
                Preview
              </h3>

              {preview}

            </div>
          )}

          <button
            onClick={
              handleUpload
            }
            disabled={
              uploading
            }
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:bg-green-300"
          >
            {uploading
              ? "Uploading..."
              : "Submit Prescription"}
          </button>

        </div>

      </div>
    </AppLayout>
  );
}

export default UploadPrescription;