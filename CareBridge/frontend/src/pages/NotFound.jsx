import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center px-6">

      <h1 className="text-8xl font-bold text-blue-600 dark:text-blue-400">
        404
      </h1>

      <h2 className="text-2xl font-semibold mt-4 dark:text-white">
        Page Not Found
      </h2>

      <p className="text-slate-500 dark:text-slate-300 mt-2 text-center">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
      >
        Back to Dashboard
      </Link>

    </div>
  );
}

export default NotFound;