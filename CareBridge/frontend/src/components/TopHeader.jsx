import {
  Bell,
  Search,
  Moon,
  Sun,
} from "lucide-react";

import {
  useEffect,
  useContext,
  useState,
} from "react";

import { useTheme } from "../theme/ThemeProvider";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function TopHeader() {
  const { darkMode, setDarkMode } =
    useTheme();
  const { user } = useContext(AuthContext);

  const [
    notificationCount,
    setNotificationCount,
  ] = useState(0);

  const userInitials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((namePart) => namePart[0])
      .join("")
      .toUpperCase() || "U";

  useEffect(() => {
    fetchNotificationCount();
  }, []);

  const fetchNotificationCount =
    async () => {
      try {
        const response =
          await api.get(
            "/notifications/my-notifications"
          );

        const unread =
          response.data.notifications.filter(
            (item) => !item.isRead
          ).length;

        setNotificationCount(
          unread
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-md p-4 mb-6 flex items-center justify-between">

      {/* Search */}

      <div className="flex items-center gap-3">
        <Search
          size={18}
          className="text-slate-600 dark:text-slate-300"
        />

        <input
          type="text"
          placeholder="Search medicines..."
          className="outline-none w-32 md:w-64 bg-transparent text-slate-700 dark:text-white placeholder:text-slate-400"
        />
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-3 pr-2">

        {/* Theme Toggle */}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300"
        >
          {darkMode ? (
            <Sun
              size={18}
              className="text-yellow-400"
            />
          ) : (
            <Moon
              size={18}
              className="text-slate-700 dark:text-slate-300"
            />
          )}
        </button>

        {/* Notification Bell */}

        <div className="relative">

          <Bell
            size={20}
            className="text-slate-700 dark:text-slate-300"
          />

          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
              {notificationCount}
            </span>
          )}

        </div>

        {/* User Avatar */}

        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0">
          {userInitials}
        </div>

      </div>

    </div>
  );
}

export default TopHeader;