import React, { useState } from "react";
import LoginSection from "../../components/auth/LoginSection";
import RegisterSection from "../../components/auth/RegisterSection";
import '../../components/auth/style.scss'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="authen-page light-yellow-background ">
      {isLogin ? (
        <LoginSection setIsLogin={setIsLogin} />
      ) : (
        <RegisterSection setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default LoginPage;
