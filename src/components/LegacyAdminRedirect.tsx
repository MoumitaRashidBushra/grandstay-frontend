import { Navigate, useLocation } from "react-router-dom";

// Old /admin URLs redirect into the single staff console.
const pathMap: Record<string, string> = {
  "/admin": "/staff",
  "/admin/reservations": "/staff/reservations",
  "/admin/rooms": "/staff/rooms",
  "/admin/categories": "/staff/categories",
  "/admin/staff": "/staff/accounts",
  "/admin/settings": "/staff/settings",
  "/admin/reports": "/staff/reports",
};

function LegacyAdminRedirect() {
  const location = useLocation();
  const mapped = pathMap[location.pathname];
  const fallback = location.pathname.replace(/^\/admin/, "/staff");

  return (
    <Navigate
      to={`${mapped ?? fallback}${location.search}${location.hash}`}
      replace
    />
  );
}

export default LegacyAdminRedirect;
