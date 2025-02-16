import React, { useState } from "react";

const OtpRegister = ({
  email,
  verifyAction,
  inputsRef,
  error,
  setError,
  resendOtp,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const digits = pastedData.replace(/\D/g, "").split("");

    digits.forEach((digit, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = digit;
      }
    });

    const emptyInput = inputsRef.current.find((input) => input.value === "");
    if (emptyInput) {
      emptyInput.focus();
    } else {
      inputsRef.current[inputsRef.current.length - 1].focus();
    }
  };

  const handleInput = (e, index) => {
    if (setError) {
      setError();
    }

    const inputLength = e.target.value.length;
    const maxLength = e.target.maxLength || 0;

    const isKeyboardEvent = e.key !== undefined;

    if (
      isKeyboardEvent &&
      e.key === "Backspace" &&
      inputLength === 0 &&
      index > 0
    ) {
      inputsRef.current[index - 1].value = "";
      inputsRef.current[index - 1].focus();
    } else if (
      inputLength >= maxLength &&
      index < inputsRef.current.length - 1
    ) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]/;

    if (!regex.test(keyValue)) {
      e.preventDefault();
    }
  };

  const checkButtonDisabled = () => {
    setIsButtonDisabled(
      (prev) =>
        inputsRef.current.filter((input) => input?.value !== "").length !== 6
    );
  };

  const handleVerify = () => {
    if (!isButtonDisabled) {
      verifyAction();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className=" p-8 w-full max-w-md  ">
        <div className="text-center mb-6">
          <div className="text-xl font-semibold">OTP Verification</div>
          <p className="text-sm text-gray-600 mt-2">
          Please enter the OTP code sent to your email{" "}
            <span className="font-semibold">{email}</span> 
          </p>
        </div>
        <div className="flex justify-between gap-2 mb-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                ref={(ref) => (inputsRef.current[index] = ref)}
                type="text"
                maxLength={1}
                onKeyDown={(e) => handleInput(e, index)}
                onKeyUp={checkButtonDisabled}
                onKeyPress={handleKeyPress}
                onPaste={handlePaste}
                className="w-1/6 p-3 text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
        </div>
        {error && <span className="text-red-500 text-sm mb-4">{error}</span>}
        <button
          className={`w-full py-2 bg-blue-500 text-white rounded-md ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleVerify}
          disabled={isButtonDisabled}
        >
          Confirm
        </button>
        <div className="flex items-center justify-center gap-2 mt-4">
          <p className="text-sm text-gray-500">Haven't received OTP yet?</p>
          <button
            className="text-blue-500 text-sm font-medium hover:underline"
            onClick={resendOtp}
          >
            Resend!
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpRegister;
