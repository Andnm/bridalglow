import { message } from "antd";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrSecure } from "react-icons/gr";
import { IoPerson } from "react-icons/io5";
import { MdOutlineMail, MdPhone } from "react-icons/md";
import "./style.scss";
import { emailRegex } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUserThunk,
  loginGoogleThunk,
  registerThunk,
} from "../../redux/actions/userThunk";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  auth,
  googleProvider,
  signInWithPopup,
} from "../../services/configFirebase";

const RegisterSection = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
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

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !name || !phoneNumber) {
      setError(
        "Vui lòng không để trống tên, email, số điện thoại và mật khẩu!"
      );
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email không hợp lệ!");
      setIsLoading(false);
      return;
    }

    if (!isChecked) {
      setError(
        "Vui lòng đồng ý với các điều khoản và chính sách trước khi đăng ký!"
      );
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        email: email,
        password: password,
        fullname: name,
        phone_number: phoneNumber,
      };

      const action = await dispatch(registerThunk(data));
      if (registerThunk.rejected.match(action)) {
        toast.error(action.payload || action.error.message);
      } else {
        const getCurrentUserAction = await dispatch(getCurrentUserThunk());
        if (getCurrentUserThunk.rejected.match(getCurrentUserAction)) {
          toast.error(action.payload || action.error.message);
        } else {
          setName("");
          setPhoneNumber("");
          setEmail("");
          setPassword("");
          navigate("/");
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
          src="https://thanhnien.mediacdn.vn/Uploaded/thuyhang/2021_12_01/dam-cuoi-online-1-5848.jpg"
          alt={"signup-img"}
          loading="lazy"
          style={{
            height: "750px",
            display: "block",
            margin: "0 auto",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="right">
        <div className="content">
          <h1 className="font-semibold text-center">Create New Account</h1>
          <p className="text-center font-medium mt-2">
            Create an account now to join Bridal Glow
          </p>
          <div
            className="mt-7 btn-login-gg flex items-center justify-center gap-2"
            onClick={handleLoginWithGoogle}
          >
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium">Register with Google</span>
          </div>

          <div className="line-text font-medium my-7">Or</div>

          <div className="input-field relative">
            <input
              type="text"
              required
              placeholder="Enter your full name"
              className="font-semibold text-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <IoPerson className="absolute left-3 w-6 h-6 opacity-30" />
          </div>

          <div className="input-field relative mt-6">
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
              type="text"
              required
              placeholder="Enter your phone number"
              className="font-semibold text-lg"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <MdPhone className="absolute left-3 w-6 h-6 opacity-30" />
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

          <div className="my-6 flex flex-row items-center justify-between">
            <div>
              <input
                type="checkbox"
                id="forgot-checkbox"
                className="cursor-pointer"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label
                htmlFor="forgot-checkbox"
                className="cursor-pointer font-semibold ml-2"
              >
                I agree to the terms and policies
              </label>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center mt-2 mb-2">{error}</p>
          )}

          <div
            className="btn-action-login-register text-center text-lg cursor-pointer"
            onClick={handleRegister}
          >
            {isLoading ? "Handling..." : "Sign up"}
          </div>
          <p className="text-center mt-6 text-register font-semibold">
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)} className="text-blue-800">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
