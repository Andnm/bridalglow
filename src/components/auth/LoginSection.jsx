import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrSecure } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md";
import { message } from "antd";
import "./style.scss";
import { useDispatch } from "react-redux";
import { emailRegex, ROLE_ADMIN, ROLE_CUSTOMER } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "../loading/SpinnerLoading";
import { getCurrentUserThunk, loginGoogleThunk, loginThunk } from "../../redux/actions/userThunk";
import { toast } from "react-toastify";
import {
  auth,
  googleProvider,
  signInWithPopup,
} from "../../services/configFirebase";

const LoginSection = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken();

      const response = await dispatch(loginGoogleThunk({ token }));
      if (loginGoogleThunk.rejected.match(response)) {
        toast.error(response.payload || "Đăng nhập thất bại");
      } else {
        const getCurrentUserAction = await dispatch(getCurrentUserThunk());
        if (getCurrentUserThunk.rejected.match(getCurrentUserAction)) {
          toast.error(response.payload || response.error.message);
        } else {
          toast.success("Đăng nhập thành công");
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Đăng nhập Google thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        email: email,
        password: password,
      };
      const response = await dispatch(loginThunk(formData));
      if (loginThunk.rejected.match(response)) {
        toast.error(response.payload || response.error.message);
      } else {
        const getCurrentUserAction = await dispatch(getCurrentUserThunk());

        if (getCurrentUserThunk.rejected.match(getCurrentUserAction)) {
          toast.error(response.payload || response.error.message);
        } else {
          setEmail("");
          setPassword("");
          navigate("/");
          const userRole = getCurrentUserAction?.payload?.role;

          switch (userRole) {
            case ROLE_ADMIN:
              navigate("/dashboard");
              break;
            case ROLE_CUSTOMER:
              navigate("/");
              break;
            default:
              navigate("/");
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container login-section py-10">
      <div className="left">
        <img
          src="https://nld.mediacdn.vn/2019/11/10/597a1040-2-1573351685214685995574.jpg"
          alt="login-img"
          loading="lazy"
          style={{
            height: "600px",
            display: "block",
            margin: "0 auto",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="right">
        <div className="content">
          <h1 className="font-semibold text-center">Welcome Back</h1>
          <p className="text-center font-medium mt-2">
            Sign in for a full experience
          </p>
          <div
            aria-disabled={isLoading}
            className="mt-7 btn-login-gg flex items-center justify-center gap-2"
            onClick={handleLoginWithGoogle}
          >
            <FcGoogle className="w-5 h-5" />{" "}
            <span className="font-medium">Login with Google</span>
          </div>

          <div className="line-text font-medium my-7">Or</div>

          <form onSubmit={handleLogin}>
            <div className="input-field relative">
              <input
                type="text"
                required
                placeholder="Enter your email"
                className="font-semibold text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMail className="absolute left-3 w-6 h-6 opacity-30" />
            </div>

            <div className="input-field relative mt-6">
              <input
                type="password"
                required
                placeholder="Password"
                className="font-semibold text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <GrSecure className="absolute left-3 w-6 h-6 opacity-30" />
            </div>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <div className="my-6 flex flex-row items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="forgot-checkbox"
                  className="cursor-pointer"
                />
                <label
                  htmlFor="forgot-checkbox"
                  className="cursor-pointer font-semibold ml-2"
                >
                  Remember
                </label>
              </div>
              <p className="forgot font-semibold">Forgot password?</p>
            </div>

            <button
              type="submit"
              className="btn-action-login-register text-center text-lg cursor-pointer"
              disabled={isLoading}
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-register font-semibold">
            You don't have account?{" "}
            <span onClick={() => setIsLogin(false)} className="text-blue-800">
              Please register an account
            </span>
          </p>
        </div>
      </div>
      {isLoading && <SpinnerLoading />}
    </div>
  );
};

export default LoginSection;
