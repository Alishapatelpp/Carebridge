import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function ManageAdmins() {
  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [editingAdmin, setEditingAdmin] =
  useState(null);

const [editForm, setEditForm] =
  useState({
    name: "",
    email: "",
    adminLevel: 2,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminLevel: 1,
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await api.get(
        "/admin/users"
      );

      const adminUsers =
        response.data.users.filter(
          (user) => user.role === "admin"
        );

      setAdmins(adminUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const createAdmin = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/admin/admins", {
        ...formData,
        role: "admin",
      });

      alert("Admin created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        adminLevel: 1,
      });

      fetchAdmins();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to create admin"
      );
    }
  };
const openEditModal = (admin) => {
  setEditingAdmin(admin);

  setEditForm({
    name: admin.name,
    email: admin.email,
    adminLevel: admin.adminLevel,
  });
};

const updateAdmin = async () => {
  try {
    await api.put(
      `/admin/users/${editingAdmin._id}`,
      editForm
    );

    alert(
      "Admin updated successfully"
    );

    setEditingAdmin(null);

    fetchAdmins();
  } catch (error) {
    console.error(error);
  }
};
const toggleAdminStatus =
  async (admin) => {
    try {
      await api.put(
        `/admin/users/status/${admin._id}`
      );

      fetchAdmins();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAdmin = async (admin) => {
    if (admin.adminLevel === 1) {
      alert(
        "Super Admin cannot be deleted"
      );
      return;
    }

    if (admin._id === currentUser._id) {
      alert(
        "You cannot delete yourself"
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete ${admin.name}?`
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/admin/users/${admin._id}`
      );

      alert("Admin deleted");

      fetchAdmins();
    } catch (error) {
      console.error(error);
    }
  };

  const getAdminLevelName = (
    level
  ) => {
    switch (level) {
      case 1:
        return "Super Admin";
      case 2:
        return "Admin";
      case 3:
        return "Support Admin";
      default:
        return "Unknown";
    }
  };

  const getBadgeColor = (
    level
  ) => {
    switch (level) {
      case 1:
        return "bg-red-100 text-red-600";
      case 2:
        return "bg-purple-100 text-purple-600";
      case 3:
        return "bg-green-100 text-green-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      admin.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  if (currentUser?.adminLevel !== 1) {
    return (
      <AppLayout role="admin">
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h1 className="text-2xl font-bold text-red-600">
              Access Denied
            </h1>

            <p className="text-slate-500 mt-2">
              Only Super Admin can access
              this page.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout role="admin">
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-green-600">
            Manage Admins
          </h1>

          <p className="text-slate-500 mt-2">
            Create and manage platform administrators.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">
              Total Admins
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {admins.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">
              Super Admins
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {
                admins.filter(
                  (admin) =>
                    admin.adminLevel === 1
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-slate-500">
              Admin / Support
            </p>

            <h2 className="text-3xl font-bold text-purple-600">
              {
                admins.filter(
                  (admin) =>
                    admin.adminLevel > 1
                ).length
              }
            </h2>
          </div>
            <div className="bg-white rounded-2xl shadow p-5">

            <p className="text-slate-500">
                Active Admins
            </p>

            <h2 className="text-3xl font-bold text-green-600">
                {
                admins.filter(
                    (admin) =>
                    admin.isActive
                ).length
                }
            </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

            <p className="text-slate-500">
                Disabled Admins
            </p>

            <h2 className="text-3xl font-bold text-red-600">
                {
                admins.filter(
                    (admin) =>
                    !admin.isActive
                ).length
                }
            </h2>

            </div>

        </div>

        {/* Create Admin */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">

          <h2 className="text-xl font-bold text-green-600 mb-4">
            Create Admin
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            />

            <select
                value={formData.adminLevel}
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    adminLevel: Number(
                        e.target.value
                    ),
                    })
                }
                className="border rounded-xl p-3"
                >
                <option value={1}>
                    Super Admin
                </option>

                <option value={2}>
                    Admin
                </option>

                <option value={3}>
                    Support Admin
                </option>
                </select>

          </div>

          <button
            onClick={createAdmin}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Create Admin
          </button>

        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">

          <input
            type="text"
            placeholder="Search Admin by Name or Email"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

        {/* Admin Cards */}
        <div className="grid gap-5">

          {filteredAdmins.map(
            (admin) => (
              <div
                key={admin._id}
                className="bg-white rounded-2xl shadow p-5"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                  <div>
                    <h2 className="text-xl font-bold text-green-600">
                      {admin.name}
                    </h2>

                    <p className="text-slate-500">
                      {admin.email}
                    </p>
                    <div className="mt-2">

                    {admin.isActive ? (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                        Active
                        </span>
                    ) : (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                        Disabled
                        </span>
                    )}

                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm mt-3 md:mt-0 ${getBadgeColor(
                      admin.adminLevel
                    )}`}
                  >
                    {getAdminLevelName(
                      admin.adminLevel
                    )}
                  </span>


                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5">

                  <p>
                    <strong>ID:</strong>{" "}
                    {admin._id}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    {getAdminLevelName(
                    admin.adminLevel
                    )}
                                        
                  </p>

                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(
                      admin.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="flex gap-3 mt-5">

                <button
                    onClick={() =>
                    openEditModal(admin)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                >
                    Edit
                </button>

                <button
                    onClick={() =>
                    toggleAdminStatus(admin)
                    }
                    className={`px-4 py-2 rounded-xl text-white ${
                    admin.isActive
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {admin.isActive
                    ? "Disable"
                    : "Enable"}
                </button>

                {admin._id !== currentUser._id && (
                    <button
                    onClick={() =>
                        deleteAdmin(admin)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                    >
                    Delete
                    </button>
                )}

                </div>

              </div>
            )
          )}

          {filteredAdmins.length === 0 && (
            <div className="bg-white rounded-2xl p-10 shadow text-center">
              No admins found.
            </div>
          )}

        </div>
            {editingAdmin && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

                <h2 className="text-xl font-bold mb-4">
                    Edit Admin
                </h2>

                <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                    setEditForm({
                        ...editForm,
                        name: e.target.value,
                    })
                    }
                    className="w-full border rounded-xl p-3 mb-3"
                />

                <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                    setEditForm({
                        ...editForm,
                        email: e.target.value,
                    })
                    }
                    className="w-full border rounded-xl p-3 mb-3"
                />

                <select
                    value={editForm.adminLevel}
                    onChange={(e) =>
                    setEditForm({
                        ...editForm,
                        adminLevel: Number(
                        e.target.value
                        ),
                    })
                    }
                    className="w-full border rounded-xl p-3 mb-4"
                >
                    <option value={1}>
                    Super Admin
                    </option>

                    <option value={2}>
                    Admin
                    </option>

                    <option value={3}>
                    Support Admin
                    </option>
                </select>

                <div className="flex gap-3">

                    <button
                    onClick={updateAdmin}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl"
                    >
                    Save
                    </button>

                    <button
                    onClick={() =>
                        setEditingAdmin(null)
                    }
                    className="bg-gray-500 text-white px-4 py-2 rounded-xl"
                    >
                    Cancel
                    </button>

                </div>

                </div>

            </div>
            )}
      </div>
    </AppLayout>
  );
}

export default ManageAdmins;