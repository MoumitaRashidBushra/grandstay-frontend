import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthApiSetup from "../components/AuthApiSetup";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

// Application layouts.
const CustomerLayout = lazy(() => import("../layouts/CustomerLayout"));
const StaffLayout = lazy(() => import("../layouts/StaffLayout"));

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

// Staff pages.
const StaffPage = lazy(() => import("../pages/staff/StaffPage"));
const StaffOperationPage = lazy(
  () => import("../pages/staff/StaffOperationPage"),
);

// General pages.
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const NoAccessPage = lazy(() => import("../pages/NoAccessPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

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
          <Route path="/no-access" element={<NoAccessPage />} />

          <Route
            path="/rooms"
            element={
              <>
                <Navbar />
                <div className="min-h-screen bg-slate-50 px-5 pt-28 text-slate-800 sm:px-8">
                  <BrowseRoomsPage />
                </div>
              </>
            }
          />

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

          {/* Shared Staff Console: Admin and Receptionist */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "RECEPTIONIST"]} />
            }
          >
            <Route element={<StaffLayout />}>
              {/* Receptionist Front Desk */}
              <Route path="/staff" element={<StaffPage />} />

              {/* Shared operational pages */}
              <Route
                path="/staff/find-booking"
                element={
                  <StaffOperationPage
                    title="Find Booking"
                    description="Search and retrieve an existing guest reservation."
                  />
                }
              />

              <Route
                path="/staff/arrivals"
                element={
                  <StaffOperationPage
                    title="Arrivals"
                    description="View the guests expected to arrive on a selected date."
                  />
                }
              />

              <Route
                path="/staff/departures"
                element={
                  <StaffOperationPage
                    title="Departures"
                    description="View the guests expected to check out on a selected date."
                  />
                }
              />

              <Route
                path="/staff/check-in"
                element={
                  <StaffOperationPage
                    title="Check-in"
                    description="Find a confirmed booking and complete the guest check-in process."
                  />
                }
              />

              <Route
                path="/staff/check-out"
                element={
                  <StaffOperationPage
                    title="Check-out"
                    description="Review an active stay and complete the guest check-out process."
                  />
                }
              />

              <Route
                path="/staff/invoices"
                element={
                  <StaffOperationPage
                    title="Invoices"
                    description="Find a booking and retrieve its invoice."
                  />
                }
              />

              <Route
                path="/staff/change-password"
                element={
                  <StaffOperationPage
                    title="Change Password"
                    description="Update the password for your staff account."
                  />
                }
              />

              {/* Admin-only pages */}
              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route
                  path="/admin/reservations"
                  element={<ReservationsPage />}
                />
                <Route path="/admin/rooms" element={<RoomsPage />} />
                <Route path="/admin/categories" element={<CategoriesPage />} />
                <Route path="/admin/staff" element={<StaffManagementPage />} />
                <Route path="/admin/settings" element={<HotelSettingsPage />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
                <Route
                  path="/admin/maintenance"
                  element={
                    <StaffOperationPage
                      title="Maintenance"
                      description="Review and manage hotel room maintenance activities."
                    />
                  }
                />
              </Route>
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
