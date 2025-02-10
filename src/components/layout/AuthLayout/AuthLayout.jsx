import React from "react";
import "./styles.scss";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import { Outlet } from "react-router-dom";
import { TfiHeadphoneAlt } from "react-icons/tfi";

function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />

      <div className="fixed bottom-10 right-5 w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition cursor-pointer light-yellow-background">
        <TfiHeadphoneAlt className="text-red-800 text-xl" />
      </div>
    </div>
  );
}

export default AuthLayout;
