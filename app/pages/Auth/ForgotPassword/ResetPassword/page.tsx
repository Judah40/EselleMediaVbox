"use client";

import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import {
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { resetPasswordValidationSchema } from "@/lib/utils/validation";
import { AxiosError } from "axios";
import { handleResetForgotPassword } from "@/app/api/AuthApi/api";

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  error?: string;
  touched?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  placeholder,
  showPassword,
  onTogglePassword,
  error,
  touched,
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <div className="relative group">
      <Field
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
          error && touched
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/10 focus:border-cyan-500"
        } focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500 pr-10 backdrop-blur-sm hover:bg-white/10`}
      />
      {(name === "password" || name === "confirmPassword") && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 focus:outline-none transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
    {error && touched && (
      <p className="mt-1 text-sm text-red-400 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

type StatusMessageProps = {
  message: string;
  type: "error" | "success";
};

const StatusMessage: React.FC<StatusMessageProps> = ({ message, type }) => (
  <div
    className={`p-4 rounded-xl w-full ${
      type === "error"
        ? "bg-red-500/10 border-red-500/50 text-red-300"
        : "bg-green-500/10 border-green-500/50 text-green-300"
    } flex items-center gap-3 border backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-top-4`}
  >
    {type === "error" ? (
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
    ) : (
      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
    )}
    <span className="text-sm font-medium">{message}</span>
  </div>
);

interface ResetPasswordFormValues {
  otp: string;
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "error" | "success";
  }>({
    message: "",
    type: "success",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const handleSubmit = async (
    values: ResetPasswordFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ResetPasswordFormValues>
  ) => {
    setIsLoading(true);
    setStatus({ message: "", type: "success" });

    try {
      // You'll need to implement this API function
      const response = await handleResetForgotPassword({
        otp: values.otp,
        newPassword: values.password,
      });

      setStatus({
        message: response.data.message || "Password reset successfully!",
        type: "success",
      });

      // Redirect to login page after successful reset
      localStorage.removeItem("otp");
      router.push("/pages/Auth/Signin");

      resetForm();
    } catch (error) {
      if (error instanceof AxiosError)
        setStatus({
          message:
            error.response?.data?.error ||
            "Failed to reset password. Please try again.",
          type: "error",
        });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Removed unused memoized component that attempted to read phoneNumber from localStorage.
  // If you need to populate a phone number state from localStorage, add a top-level state:
  //   const [phoneNumber, setPhoneNumber] = useState<string>("");
  // and then read it in a useEffect:
  useEffect(() => {
    const stored = localStorage.getItem("otp");
    if (stored) setOtp(stored);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Image
            src="/logo/vbox.png"
            width={80}
            height={80}
            alt="logo"
            priority
            className="mx-auto hover:scale-110 transition-transform duration-300"
          />
          <h2 className="mt-6 text-3xl font-bold text-white">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your {otp} and new password
          </p>
        </div>

        {/* Reset Password Form */}
        <Formik
          initialValues={{
            otp: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={resetPasswordValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6 w-full">
              {status.message && (
                <StatusMessage message={status.message} type={status.type} />
              )}

              <InputField
                label="OTP"
                name="otp"
                type="text"
                placeholder="Enter the OTP sent to your email"
                showPassword={false}
                error={errors.otp}
                touched={touched.otp}
              />

              <InputField
                label="New Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={errors.password}
                touched={touched.password}
              />

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                showPassword={showConfirmPassword}
                onTogglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
              />

              <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white py-3.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Reset Password
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    router.push("/pages/Auth/Signin");
                    localStorage.removeItem("otp");
                  }}
                  className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  Back to Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
