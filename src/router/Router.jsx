import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import AuthLayout from "../components/layout/AuthLayout/AuthLayout";
import Services from "../pages/service";

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
        <Route path="/login" element={<Services />} />
        <Route path="/login" element={<Services />} />

      </Route>

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
