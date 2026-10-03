import { useState } from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  Pill,
  FileText,
  IndianRupee,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../theme/ThemeProvider";

function PharmacySidebar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { darkMode, setDarkMode } =
    useTheme();
const user = JSON.parse(
            localStorage.getItem("user")
            );
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold"
        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
    }`;

  return (
    <>
      {!open && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-b shadow-md p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">
            CareBridge
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="text-slate-700 dark:text-slate-300"
          >
            <Menu size={24} />
          </button>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 min-h-screen
          bg-white dark:bg-slate-800
          border-r border-slate-200 dark:border-slate-700
          shadow-lg p-6
          transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              CareBridge
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Pharmacy Portal
            </p>
          </div>

          <button
            className="md:hidden text-slate-700 dark:text-slate-300"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>
            

            <div className="mb-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                {user?.name?.charAt(0) || "P"}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {user?.name || "Pharmacy"}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-300">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                {user?.role || "Pharmacy"}
              </span>

              <span className="text-xs text-slate-500">
                Logged In
              </span>
            </div>
          </div>
        <nav className="flex flex-col gap-3">

          <NavLink
            to="/pharmacy-dashboard"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/pharmacy-orders"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <Package size={18} />
            Orders
          </NavLink>

          <NavLink
            to="/inventory"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <Pill size={18} />
            Inventory
          </NavLink>

          <NavLink
            to="/pharmacy-prescriptions"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <FileText size={18} />
            Prescriptions
          </NavLink>

          <NavLink
            to="/pharmacy-revenue"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <IndianRupee size={18} />
            Revenue
          </NavLink>

          <NavLink
            to="/pharmacy-profile"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            Profile
          </NavLink>

          {/* Theme Toggle */}
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="
              flex items-center
              gap-3
              p-3
              rounded-lg
              text-left
              text-slate-700
              dark:text-slate-300
              hover:bg-slate-100
              dark:hover:bg-slate-700
              transition-all duration-300
            "
          >
            {darkMode ? (
              <>
                <Sun
                  size={18}
                  className="text-yellow-400"
                />
                Light Mode
              </>
            ) : (
              <>
                <Moon size={18} />
                Dark Mode
              </>
            )}
          </button>

          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="
              flex items-center
              gap-3
              p-3
              rounded-lg
              text-red-600
              hover:bg-red-50
              dark:hover:bg-red-900/20
              transition-all duration-300
              text-left
            "
          >
            <LogOut size={18} />
            Logout
          </button>

          <div className="mt-auto pt-8 text-xs text-slate-400 dark:text-slate-500">
            CareBridge v1.0
          </div>

        </nav>
      </aside>
    </>
  );
}

export default PharmacySidebar;