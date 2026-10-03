import { Link } from "react-router-dom";

function ApplicationSubmitted() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4">

      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-3xl w-full max-w-3xl p-8 text-center">

        {/* Success Icon */}
        <div className="text-6xl mb-4">
          ✅
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-green-600">
          Application Submitted Successfully
        </h1>

        {/* Application ID */}
        <div className="mt-6 bg-blue-50 dark:bg-slate-700 border border-blue-200 dark:border-slate-600 rounded-2xl p-4">
          <h3 className="font-semibold text-blue-600">
            Application ID
          </h3>

          <p className="text-xl font-bold mt-2">
            CB-PH-2026-001
          </p>
        </div>

        {/* Description */}
        <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed">
          Your pharmacy registration request has been submitted successfully.
          <br />
          <br />
          Our team will review your pharmacy details, drug license information,
          and supporting documents.
          <br />
          <br />
          Once verification is completed, you will receive approval to access
          the CareBridge Pharmacy Dashboard.
        </p>

        {/* Status Card */}
        <div className="mt-8 bg-yellow-50 dark:bg-slate-700 border border-yellow-200 dark:border-slate-600 rounded-2xl p-5">

          <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-400">
            Application Status
          </h2>

          <p className="mt-3 text-xl font-bold text-orange-600">
            🟡 Pending Approval
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Our verification team will review your application within
            24-48 hours.
          </p>

        </div>

        {/* Verification Progress */}
        <div className="mt-8 bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">

        <h3 className="font-semibold text-lg dark:text-white mb-8">
            Verification Progress
        </h3>

        {/* Mobile Timeline */}
        <div className="md:hidden">

            <div className="space-y-6">

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                ✓
                </div>

                <div>
                <h4 className="font-medium">
                    Pharmacy Information
                </h4>
                <p className="text-xs text-slate-500">
                    Submitted
                </p>
                </div>
            </div>

            <div className="ml-5 border-l-2 border-green-500 h-6"></div>

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                ✓
                </div>

                <div>
                <h4 className="font-medium">
                    Contact Details
                </h4>
                <p className="text-xs text-slate-500">
                    Submitted
                </p>
                </div>
            </div>

            <div className="ml-5 border-l-2 border-green-500 h-6"></div>

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                ✓
                </div>

                <div>
                <h4 className="font-medium">
                    License Details
                </h4>
                <p className="text-xs text-slate-500">
                    Submitted
                </p>
                </div>
            </div>

            <div className="ml-5 border-l-2 border-orange-400 h-6"></div>

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center">
                4
                </div>

                <div>
                <h4 className="font-medium">
                    Under Verification
                </h4>
                <p className="text-xs text-orange-600">
                    Waiting for Admin Review
                </p>
                </div>
            </div>

            <div className="ml-5 border-l-2 border-slate-300 h-6"></div>

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-300 text-white flex items-center justify-center">
                5
                </div>

                <div>
                <h4 className="font-medium">
                    Approved
                </h4>
                <p className="text-xs text-slate-500">
                    Pending
                </p>
                </div>
            </div>

            </div>

        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:flex items-center justify-between">

            <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                ✓
            </div>

            <span className="text-xs mt-2">
                Pharmacy
            </span>
            </div>

            <div className="flex-1 h-1 bg-green-500 mx-2"></div>

            <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                ✓
            </div>

            <span className="text-xs mt-2">
                Contact
            </span>
            </div>

            <div className="flex-1 h-1 bg-green-500 mx-2"></div>

            <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                ✓
            </div>

            <span className="text-xs mt-2">
                License
            </span>
            </div>

            <div className="flex-1 h-1 bg-slate-300 mx-2"></div>

            <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold">
                4
            </div>

            <span className="text-xs mt-2">
                Verify
            </span>
            </div>

            <div className="flex-1 h-1 bg-slate-300 mx-2"></div>

            <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-slate-300 text-white flex items-center justify-center font-bold">
                5
            </div>

            <span className="text-xs mt-2">
                Approved
            </span>
            </div>

        </div>

        </div>

        {/* Support Section */}
        <div className="mt-8 bg-slate-50 dark:bg-slate-700 rounded-2xl p-5">

          <h3 className="font-semibold text-lg dark:text-white">
            Need Help?
          </h3>

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            If you have any questions regarding your application,
            contact our support team.
          </p>

          <div className="mt-4 space-y-2">
            <p>📧 support@carebridge.com</p>
            <p>📞 +91 98765 43210</p>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">

          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Back To Home
          </Link>

          <Link
            to="/login"
            className="border border-slate-300 dark:border-slate-600 px-6 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-300 dark:text-white"
          >
            Go To Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ApplicationSubmitted;