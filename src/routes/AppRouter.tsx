import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerPage from "../pages/customer/CustomerPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import StaffPage from "../pages/staff/StaffPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer/*" element={<CustomerPage />} />
        <Route path="/staff/*" element={<StaffPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
