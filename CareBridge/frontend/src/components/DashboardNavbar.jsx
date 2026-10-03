import { Link } from "react-router-dom";

function DashboardNavbar() {
  return (
    <nav className="bg-white shadow-md rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">
          CareBridge
        </h1>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>
            <Link
            to="/profile"
            className="hover:text-blue-600"
            >
            Profile
            </Link>
          <Link
            to="/login"
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
            Logout
        </Link>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;