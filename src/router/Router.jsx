import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import AuthLayout from "../components/layout/AuthLayout/AuthLayout";
import Services from "../pages/service";
import LoginPage from "../pages/login";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import Profile from "../pages/profile/Profile";
import Schedule from "../pages/schedule/Schedule";
import ArtistDetail from "../pages/artistDetail/ArtistDetail";
import ChangePassword from "../pages/changePassword/ChangePassword";
import AdminTransactionPage from "../pages/admin/ManageTransaction";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ManageTransaction from "../pages/admin/ManageTransaction";
import ManageUser from "../pages/admin/ManageUser";
import ManageArtist from "../pages/admin/ManageArtist";

const Router = () => {
  return (
    <Routes>
      {/* <Route element={<UnAuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/show-component" element={<ShowComponent />} />
      </Route> */}

      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-transaction" element={<ManageTransaction />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/manage-artist" element={<ManageArtist />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
