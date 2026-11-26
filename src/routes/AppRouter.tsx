import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthApiSetup from "../components/AuthApiSetup";
import LegacyAdminRedirect from "../components/LegacyAdminRedirect";
import ProtectedRoute from "../components/ProtectedRoute";

const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const CustomerLayout = lazy(() => import("../layouts/CustomerLayout"));

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

const ChangePasswordPage = lazy(() => import("../pages/ChangePasswordPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const NoAccessPage = lazy(() => import("../pages/NoAccessPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const StaffHomePage = lazy(() => import("../pages/staff/StaffHomePage"));
const StaffPlaceholderPage = lazy(
  () => import("../pages/staff/StaffPlaceholderPage"),
);
const StaffProfilePage = lazy(() => import("../pages/staff/StaffProfilePage"));

function deskPage(title: string, description: string) {
  return <StaffPlaceholderPage title={title} description={description} />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <AuthApiSetup />

      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-gray-600">Loading page...</p>
          </div>
        }
      >
        <Routes>
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

          <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<CustomerDashboardPage />} />
              <Route path="rooms" element={<BrowseRoomsPage />} />
              <Route path="reservations" element={<MyReservationsPage />} />
              <Route path="history" element={<BookingHistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* One staff console for Admin and Receptionist (SRS v0.2 D6/D11). */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "RECEPTIONIST"]} />
            }
          >
            <Route path="/staff" element={<AdminLayout />}>
              <Route index element={<StaffHomePage />} />
              <Route
                path="find-booking"
                element={deskPage(
                  "Find booking",
                  "Search for a reservation by guest name or booking reference.",
                )}
              />
              <Route
                path="arrivals"
                element={deskPage(
                  "Today's arrivals and departures",
                  "See who is expected to arrive or leave today.",
                )}
              />
              <Route
                path="check-in"
                element={deskPage(
                  "Check-in",
                  "Check arriving guests into their rooms.",
                )}
              />
              <Route
                path="check-out"
                element={deskPage(
                  "Check-out and invoice",
                  "Complete departure and issue the invoice.",
                )}
              />
              <Route
                path="invoices/reprint"
                element={deskPage(
                  "Reprint invoice",
                  "Print a copy of an existing invoice.",
                )}
              />
              <Route
                path="availability"
                element={deskPage(
                  "Availability search",
                  "View room availability. Receptionists can search but not change inventory here.",
                )}
              />
              <Route path="profile" element={<StaffProfilePage />} />

              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="reservations" element={<ReservationsPage />} />
                <Route path="rooms" element={<RoomsPage />} />
                <Route
                  path="maintenance"
                  element={deskPage(
                    "Maintenance",
                    "Mark rooms as under maintenance. Confirmed bookings stay in place and the desk receives a warning when needed.",
                  )}
                />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="accounts" element={<StaffManagementPage />} />
                <Route path="settings" element={<HotelSettingsPage />} />
                <Route path="reports" element={<ReportsPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="/admin/*" element={<LegacyAdminRedirect />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
