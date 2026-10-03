import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import TopHeader from "../../components/TopHeader";
import api from "../../services/api";

function Notifications() {
  const [notifications,
    setNotifications] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        setLoading(true);

        const response =
          await api.get(
            "/notifications/my-notifications"
          );

        setNotifications(
          response.data.notifications || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const markAsRead =
    async (id) => {
      try {
        await api.put(
          `/notifications/read/${id}`
        );

        fetchNotifications();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6">

        <TopHeader />

        <div className="max-w-4xl mx-auto">

          {/* Header */}

          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-md px-6 py-4 mb-6">

            <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
              Notifications
            </h1>

            <p className="text-slate-500 dark:text-slate-300 mt-1">
              Stay updated with your latest activities and alerts.
            </p>

          </div>

          {loading ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
              No notifications found.
            </div>
          ) : (
            <div className="space-y-4">

              {notifications.map(
                (notification) => (
                  <div
                    key={
                      notification._id
                    }
                    className={`rounded-2xl shadow-md p-6 border transition-all duration-300 hover:shadow-xl ${
                      notification.isRead
                        ? "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        : "bg-white dark:bg-slate-800 border-green-300 dark:border-green-500"
                    }`}
                  >
                    <h2 className="text-lg font-semibold dark:text-white">
                      🔔{" "}
                      {notification.title}
                    </h2>

                    <p className="text-slate-600 dark:text-slate-300 mt-2">
                      {notification.message}
                    </p>

                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-3">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </p>

                    <div className="mt-4 flex items-center gap-3">

                      {!notification.isRead && (
                        <button
                          onClick={() =>
                            markAsRead(
                              notification._id
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                          Mark Read
                        </button>
                      )}

                      {notification.isRead && (
                        <span className="text-green-600 font-medium">
                          ✅ Read
                        </span>
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
    </AppLayout>
  );
}

export default Notifications;