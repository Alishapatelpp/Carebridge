import { Link } from "react-router-dom";
import Logo from "./Logo";

function DashboardNavbar() {
  return (
    <nav className="bg-white shadow-md rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <Logo imageClassName="h-20" />

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hover:text-green-600"
          >
            Home
          </Link>
            <Link
            to="/profile"
            className="hover:text-green-600"
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