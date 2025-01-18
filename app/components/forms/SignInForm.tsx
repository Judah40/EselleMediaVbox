"use client";

import React from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { signInValidationSchema } from "@/app/lib/signInValidation";
import { handleUserLogin } from "../../api/AuthApi/api";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

type inputField = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword?: () => void;
};
const InputField: React.FC<inputField> = ({
  label,
  name,
  type,
  placeholder,
  showPassword,
  onTogglePassword,
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <Field
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 pr-10"
      />
      {name === "password" && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  </div>
);

type StatusMessageProps = {
  message: string; // The message to display
  type: "error" | "success"; // The type of the message determines styling
};
const StatusMessage: React.FC<StatusMessageProps> = ({ message, type }) => (
  <div
    className={`p-4 rounded-lg w-full ${
      type === "error"
        ? "bg-red-100 border-red-400 text-red-700"
        : "bg-green-100 border-green-400 text-green-700"
    } flex items-center justify-center border transition-all duration-300 animate-fadeIn`}
  >
    {message}
  </div>
);

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  type Status = {
    message: string;
    type: "error" | "success"; // Add valid types and an empty string for initialization
  };

  const [status, setStatus] = useState<Status>({
    message: "",
    type: "success" as "success" | "error",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ...existing code...

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>
  ) => {
    setIsLoading(true);

    try {
      const response = await handleUserLogin(values);

      const { token, userType, message } = response.data;

      if (rememberMe) {
        const thirtyDays = 30 * 24 * 60 * 60;
        Cookies.set("token", token, { expires: thirtyDays });
        Cookies.set("userType", userType, { expires: thirtyDays });
      } else {
        Cookies.set("token", token);
        Cookies.set("userType", userType);
      }

      setStatus({ message, type: "success" });

      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      if (error instanceof AxiosError) {
        setStatus({
          message: error.response?.data?.error || "An error occurred",
          type: "error",
        });
      } else {
        setStatus({
          message: "An unexpected error occurred",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // ...existing code...

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={signInValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6 w-full max-w-md">
          {status.message && (
            <StatusMessage message={status.message} type={status.type} />
          )}

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            showPassword={false}
          />
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}

          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          {errors.password && touched.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
