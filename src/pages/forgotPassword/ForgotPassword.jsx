import React, { useRef, useState } from "react";
import { forgotPassword, resetPassword } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import OtpRegister from "../../components/auth/OtpRegister";
import SpinnerLoading from "../../components/loading/SpinnerLoading";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isOpenOtpForm, setIsOpenOtpForm] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [errorOtp, setErrorOtp] = useState("");
  const inputsOtpRef = useRef([]);
  const navigate = useNavigate();

  const handleFormSubmitEmail = async (e) => {
    e.preventDefault();
    setLoadingData(true);
    try {
      await forgotPassword(email);
      setIsOpenOtpForm(true);
    } catch (error) {
      toast.error("An error occurred while changing password.: " + error.response?.data);
    } finally {
      setLoadingData(false);
    }
  };

  const confirmOTP = async () => {
    setLoadingData(true);
    try {
      const otp = inputsOtpRef.current.map((input) => input.value).join("");
      const dataBody = { otp, email };
      await resetPassword(dataBody);
      navigate("/");
      setIsOpenOtpForm(false);
      toast.success("A new password has been sent to your email.!");
    } catch (error) {
      setErrorOtp(error.response?.data);
    } finally {
      setLoadingData(false);
    }
  };

  const resendOTP = async () => {
    setErrorOtp("");
    setLoadingData(true);
    try {
      await forgotPassword(email);
      toast.success("OTP has been resent, please check!");
    } catch (error) {
      toast.error("An error occurred while sending OTP. Please try again.!");
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        {!isOpenOtpForm ? (
          <div>
            <h2 className="text-center text-xl font-semibold mb-6">
              Reset your password
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Enter the email you want to retrieve your password:
            </p>
            <form onSubmit={handleFormSubmitEmail} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        ) : (
          <OtpRegister
            email={email}
            verifyAction={confirmOTP}
            inputsRef={inputsOtpRef}
            error={errorOtp}
            setError={() => setErrorOtp("")}
            resendOtp={resendOTP}
          />
        )}

        {loadingData && <SpinnerLoading />}
      </div>
    </div>
  );
};

export default ForgotPassword;
