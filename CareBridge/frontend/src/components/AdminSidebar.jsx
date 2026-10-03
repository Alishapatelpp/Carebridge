import { NavLink, useNavigate } from "react-router-dom";
import {
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
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-5 overflow-y-auto z-50">

      <Logo className="mb-2" imageClassName="h-20" />

      <div className="mb-8">
        <p className="text-xs uppercase tracking-wider text-slate-400">
          {getAdminTitle()}
        </p>

        <p className="text-xs text-slate-500 mt-1 break-all">
          {currentUser?.email}
        </p>
      </div>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-green-100 text-green-600 font-medium"
                  : "hover:bg-slate-100 dark:hover:bg-slate-700"
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
          className="flex items-center gap-3 w-full p-3 rounded-xl text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default AdminSidebar;