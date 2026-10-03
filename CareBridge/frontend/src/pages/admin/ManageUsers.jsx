import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";
import {
  Search,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get(
        "/admin/users"
      );

      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/admin/users/${id}`
      );

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.put(
        `/admin/users/status/${id}`
      );

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

    const filteredUsers = users
    .filter(
        (user) => user.role === "patient"
    )
    .filter((user) => {
        const matchesSearch =
        user.name
            ?.toLowerCase()
            .includes(
            search.toLowerCase()
            ) ||
        user.email
            ?.toLowerCase()
            .includes(
            search.toLowerCase()
            );

        const matchesLocation =
        !location ||
        user.city === location;

        const matchesStatus =
        !status ||
        (status === "Active" &&
            user.isActive) ||
        (status === "Suspended" &&
            !user.isActive);

        return (
        matchesSearch &&
        matchesLocation &&
        matchesStatus
        );
    });

  const uniqueCities = [
    ...new Set(
      users
        .map((u) => u.city)
        .filter(Boolean)
    ),
  ];

  return (
    <AppLayout role="admin">
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6">

        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            Manage Users
          </h1>

          <p className="text-slate-500 mt-2">
            View, search and manage all platform users.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <div className="bg-white rounded-2xl p-5 shadow">
            <Users className="text-blue-600 mb-2" />

            <h3 className="text-slate-500">
              Total Users
            </h3>

            <p className="text-3xl font-bold">
              {
                users.filter(
                    (user) =>
                    user.role === "patient"
                ).length
                }
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <UserCheck className="text-green-600 mb-2" />

            <h3 className="text-slate-500">
              Active
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {
                users.filter(
                    (user) =>
                    user.role === "patient" &&
                    user.isActive
                ).length
                }
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <UserX className="text-red-600 mb-2" />

            <h3 className="text-slate-500">
              Suspended
            </h3>

            <p className="text-3xl font-bold text-red-600">
              {
                users.filter(
                    (user) =>
                    user.role === "patient" &&
                    !user.isActive
                ).length
                }
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <Users className="text-purple-600 mb-2" />

            <h3 className="text-slate-500">
              New Today
            </h3>

            <p className="text-3xl font-bold text-purple-600">
              {
                users.filter((user) => {
                if (
                user.role !== "patient"
                )
                return false;
                  const today =
                    new Date()
                      .toISOString()
                      .split("T")[0];

                  return (
                    user.createdAt?.startsWith(
                      today
                    )
                  );
                }).length
              }
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow mb-6">

          <div className="grid md:grid-cols-4 gap-4">

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search Name or Email..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl pl-10 p-3"
              />
            </div>

            <select
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
              className="border rounded-xl p-3"
            >
              <option value="">
                All Locations
              </option>

              {uniqueCities.map(
                (city) => (
                  <option
                    key={city}
                    value={city}
                  >
                    {city}
                  </option>
                )
              )}
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="border rounded-xl p-3"
            >
              <option value="">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Suspended">
                Suspended
              </option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setLocation("");
                setStatus("");
              }}
              className="bg-blue-600 text-white rounded-xl p-3"
            >
              Reset Filters
            </button>

          </div>

        </div>

        {/* User Cards */}
        <div className="grid gap-5">

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-md p-5"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                <div>
                  <h2 className="text-xl font-bold text-blue-600">
                    {user.name}
                  </h2>

                  <p className="text-slate-500">
                    {user.email}
                  </p>
                </div>

                <div className="mt-4 md:mt-0">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.isActive
                      ? "Active"
                      : "Suspended"}
                  </span>

                </div>

              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-5">

                <p>
                  <strong>ID:</strong>{" "}
                  {user._id}
                </p>

                <p>
                  <strong>City:</strong>{" "}
                  {user.city || "N/A"}
                </p>

                <p>
                  <strong>Role:</strong>{" "}
                  {user.role}
                </p>

              </div>

              <div className="flex flex-wrap gap-3 mt-5">

                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                  View
                </button>

                <button
                  onClick={() =>
                    toggleStatus(
                      user._id
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
                >
                  {user.isActive
                    ? "Suspend"
                    : "Activate"}
                </button>

                <button
                  onClick={() =>
                    deleteUser(
                      user._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </AppLayout>
  );
}

export default ManageUsers;