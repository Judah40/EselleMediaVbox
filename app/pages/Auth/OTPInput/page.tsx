'use client'

import React, { useState } from "react";
import OTPInput from "react-otp-input";  // Import the OTP input component
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { handleOTPVerification } from "@/app/api/AuthApi/api";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOTPChange = (otp: string) => {
    setOtp(otp);
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await handleOTPVerification(otp); // You need to define this function
      Cookies.set("token", response.data.token); // Store token in cookies
      router.push("/pages/Auth/PasswordSetup"); // Redirect to password setup
    } catch (error) {
      setError("OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Enter OTP</h2>
      
      <OTPInput
        value={otp}
        onChange={handleOTPChange}
        numInputs={6}
        inputStyle="otp-input"
        shouldAutoFocus
        renderInput={(props: React.InputHTMLAttributes<HTMLInputElement>) => (
          <input {...props} className="otp-input" />
        )}      />
      
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg"
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default OTPVerification;
