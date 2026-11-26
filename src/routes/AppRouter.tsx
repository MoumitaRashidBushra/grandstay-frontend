import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthApiSetup from "../components/AuthApiSetup";
import ProtectedRoute from "../components/ProtectedRoute";

// Load layouts only when their routes are needed.
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const CustomerLayout = lazy(() => import("../layouts/CustomerLayout"));

// Admin pages.
const AdminPage = lazy(() => import("../pages/admin/AdminPage"));
const CategoriesPage = lazy(() => import("../pages/admin/CategoriesPage"));
const HotelSettingsPage = lazy(
  () => import("../pages/admin/HotelSettingsPage"),
);
const ReportsPage = lazy(() => import("../pages/admin/ReportsPage"));
const ReservationsPage = lazy(() => import("../pages/admin/ReservationsPage"));
const RoomsPage = lazy(() => import("../pages/admin/RoomsPage"));
const StaffManagementPage = lazy(
  () => import("../pages/admin/StaffManagementPage"),
);

// Customer pages.
const BookingHistoryPage = lazy(
  () => import("../pages/customer/BookingHistoryPage"),
);
const BrowseRoomsPage = lazy(() => import("../pages/customer/BrowseRoomsPage"));
const CustomerDashboardPage = lazy(
  () => import("../pages/customer/CustomerDashboardPage"),
);
const MyReservationsPage = lazy(
  () => import("../pages/customer/MyReservationsPage"),
);
const ProfilePage = lazy(() => import("../pages/customer/ProfilePage"));

// General pages.
const ChangePasswordPage = lazy(() => import("../pages/ChangePasswordPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const NoAccessPage = lazy(() => import("../pages/NoAccessPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const StaffPage = lazy(() => import("../pages/staff/StaffPage"));

function AppRouter() {
  return (
    <BrowserRouter>
      {/* Configure authenticated API requests. */}
      <AuthApiSetup />

      {/* Display a loading message while a page chunk is downloading. */}
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-gray-600">Loading page...</p>
          </div>
        }
      >
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/no-access" element={<NoAccessPage />} />

          <Route
            element={
              <ProtectedRoute
                allowedRoles={["ADMIN", "RECEPTIONIST", "CUSTOMER"]}
                allowDuringPasswordReset
              />
            }
          >
            <Route path="/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* Customer routes */}
          <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<CustomerDashboardPage />} />
              <Route path="rooms" element={<BrowseRoomsPage />} />
              <Route path="reservations" element={<MyReservationsPage />} />
              <Route path="history" element={<BookingHistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Receptionist routes */}
          <Route element={<ProtectedRoute allowedRoles={["RECEPTIONIST"]} />}>
            <Route path="/staff/*" element={<StaffPage />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPage />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="rooms" element={<RoomsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="staff" element={<StaffManagementPage />} />
              <Route path="settings" element={<HotelSettingsPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Route>
          </Route>

          {/* Handle unknown routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
