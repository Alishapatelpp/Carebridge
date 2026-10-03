import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import Pharmacies from "./pages/user/Pharmacies";
import UploadPrescription from "./pages/user/UploadPrescription";
import Notifications from "./pages/user/Notifications";
import Orders from "./pages/user/Orders";
import SearchMedicine from "./pages/user/SearchMedicine";

import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import PharmacyRegister from "./pages/pharmacy/PharmacyRegister";
import ApplicationSubmitted from "./pages/pharmacy/ApplicationSubmitted";
import Inventory from "./pages/pharmacy/Inventory";
import PharmacyOrders from "./pages/pharmacy/PharmacyOrders";
import PharmacyPrescriptions from "./pages/pharmacy/PharmacyPrescriptions";
import PharmacyRevenue from "./pages/pharmacy/PharmacyRevenue";
import PharmacyProfile from "./pages/pharmacy/PharmacyProfile";


import AdminDashboard from "./pages/admin/AdminDashboard";
import PharmacyApprovals from "./pages/admin/PharmacyApprovals";
import Analytics from "./pages/admin/Analytics";
import ManageUsers from "./pages/admin/ManageUsers";
import ManagePharmacies from "./pages/admin/ManagePharmacies";
import ManageAdmins from "./pages/admin/ManageAdmins";
import ManageOrders from "./pages/admin/ManageOrders";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
        path="/pharmacy-register"
        element={<PharmacyRegister />}
        />

        {/* Patient Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pharmacies"
          element={
            <ProtectedRoute>
              <Pharmacies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-prescription"
          element={
            <ProtectedRoute>
              <UploadPrescription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-medicine"
          element={<SearchMedicine />}
          />

        {/* Pharmacy Routes */}
        <Route
        path="/application-submitted"
        element={<ApplicationSubmitted />}
        />
        <Route
          path="/pharmacy-dashboard"
          element={
            <ProtectedRoute>
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacy-orders"
          element={
          <ProtectedRoute>
          <PharmacyOrders />
          </ProtectedRoute>
          }
          />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
        path="/pharmacy-prescriptions"
        element={
        <ProtectedRoute>
        <PharmacyPrescriptions />
        </ProtectedRoute>
        }
        />
        <Route
        path="/pharmacy-revenue"
        element={<PharmacyRevenue />}
        />
<Route
path="/pharmacy-profile"
element={<PharmacyProfile />}
/>


        {/* Admin Routes */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
        path="/pharmacy-approvals"
        element={
        <ProtectedRoute>
        <PharmacyApprovals />
        </ProtectedRoute>
        }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-users"
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-pharmacies"
          element={
            <ProtectedRoute>
              <ManagePharmacies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-admins"
          element={
            <ProtectedRoute>
              <ManageAdmins />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-orders"
          element={
            <ProtectedRoute>
              <ManageOrders />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;