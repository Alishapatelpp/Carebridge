import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  User,
  Store,
  FileText,
  Bell,
  Package,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold"
        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:translate-x-1"
    }`;

  return (
    <>
      {/* Mobile Header */}
      {!open && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 shadow-md p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
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

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:fixed top-0 left-0 z-50
          w-64 min-h-screen
          bg-white dark:bg-slate-800
          border-r border-slate-100 dark:border-slate-700
          shadow-lg
          p-6
          transform transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            CareBridge
          </h1>

          <button
            className="md:hidden text-slate-700 dark:text-slate-300"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Patient */}
        <p className="text-xs text-slate-400 dark:text-slate-500 uppercase mt-2">
          Patient
        </p>

        <div className="flex flex-col gap-3 h-full">
          <NavLink
            to="/dashboard"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/profile"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            Profile
          </NavLink>

          {/* Services */}
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase mt-4">
            Services
          </p>

          <NavLink
            to="/pharmacies"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <Store size={18} />
            Pharmacies
          </NavLink>

          <NavLink
            to="/upload-prescription"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <FileText size={18} />
            Upload Prescription
          </NavLink>

          <NavLink
            to="/notifications"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <Bell size={18} />
            Notifications
          </NavLink>

          <NavLink
            to="/orders"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            <Package size={18} />
            Orders
          </NavLink>

          {/* Logout */}
          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-2 p-2 rounded-lg mt-6 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 text-left"
          >
            <LogOut size={18} />
            Logout
          </button>

          {/* Footer */}
          <div className="mt-auto pt-8 text-xs text-slate-400 dark:text-slate-500">
            CareBridge v1.0
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;