import Sidebar from "./Sidebar";
import AdminSidebar from "./AdminSidebar";
import PharmacySidebar from "./PharmacySidebar";

function AppLayout({ children }) {
  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const role =
    currentUser?.role || "patient";

  return (
    <div className="min-h-screen">
      {role === "admin" ? (
        <AdminSidebar />
      ) : role === "pharmacy" ? (
        <PharmacySidebar />
      ) : (
        <Sidebar />
      )}

      <main className="md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;