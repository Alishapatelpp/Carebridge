import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  CheckCircle,
  Users,
  Store,
  UserCog,
  Package,
  BarChart3,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";

function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getAdminTitle = () => {
    switch (currentUser?.adminLevel) {
      case 1:
        return "Super Admin";
      case 2:
        return "Admin";
      case 3:
        return "Support Admin";
      default:
        return "Admin Panel";
    }
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Pharmacy Approvals",
      path: "/pharmacy-approvals",
      icon: <CheckCircle size={18} />,
    },
    {
      name: "Manage Users",
      path: "/manage-users",
      icon: <Users size={18} />,
    },
    {
      name: "Manage Pharmacies",
      path: "/manage-pharmacies",
      icon: <Store size={18} />,
    },

    ...(currentUser?.adminLevel === 1
      ? [
          {
            name: "Manage Admins",
            path: "/manage-admins",
            icon: <UserCog size={18} />,
          },
        ]
      : []),

    {
      name: "Manage Orders",
      path: "/manage-orders",
      icon: <Package size={18} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={18} />,
    },
  ];

  return (
    <>
      {!open && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-md p-4 flex items-center justify-between">
          <Logo imageClassName="h-16" />

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-slate-700 dark:text-slate-300"
            aria-label="Open navigation menu"
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
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-700 p-5 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <Logo imageClassName="h-20" />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="md:hidden text-slate-700 dark:text-slate-300"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

      <div className="mb-8">
        <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-400">
          {getAdminTitle()}
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 break-all">
          {currentUser?.email}
        </p>
      </div>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 font-medium"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
      </aside>
    </>
  );
}

export default AdminSidebar;