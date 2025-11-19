"use client";

import React, { useState } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { signInValidationSchema } from "@/app/lib/signInValidation";
import {
  handleForgotPasswordEmailVerification,
  handleUserLogin,
} from "@/app/api/AuthApi/api";
// import Link from "next/link";
import {
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  showPassword: boolean;
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
      {name === "password" && (
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

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "error" | "success";
  }>({
    message: "",
    type: "success",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>
  ) => {
    setIsLoading(true);
    setStatus({ message: "", type: "success" });

    try {
      const response = await handleUserLogin(values);
      const { token, userType, message, streamToken } = response.data;

      if (rememberMe) {
        const thirtyDays = 30 * 24 * 60 * 60;
        Cookies.set("token", token, { expires: thirtyDays });
        Cookies.set("userType", userType, { expires: thirtyDays });
        Cookies.set("streamToken", streamToken, { expires: thirtyDays });
      } else {
        Cookies.set("streamToken", streamToken);
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

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={signInValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-5 w-full">
          {status.message && (
            <StatusMessage message={status.message} type={status.type} />
          )}

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            showPassword={false}
            error={errors.email}
            touched={touched.email}
          />

          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            error={errors.password}
            touched={touched.password}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 transition-all cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Remember me
              </span>
            </label>

            <button
              type="button"
              onClick={() => {
                setForgetPassword(true);
              }}
              // href="/forgot-password"
              className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Forgot Password?
            </button>

            {forgetPassword && (
              <Formik
                initialValues={{ resetEmail: "" }}
                validate={(values) => {
                  const errors: { resetEmail?: string } = {};
                  if (!values.resetEmail) {
                    errors.resetEmail = "Email is required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.resetEmail
                    )
                  ) {
                    errors.resetEmail = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setIsLoading(true);
                  setStatus({ message: "", type: "success" });

                  try {
                    // Replace this with your real forgot-password API call
                    const response =
                      await handleForgotPasswordEmailVerification(
                        values.resetEmail
                      );

                    router.push("/pages/Auth/ForgotPassword/ResetPassword");
                    localStorage.setItem("otp", response.data.otp);

                    // setStatus({
                    //   message:
                    //     "If an account with that email exists, a reset link has been sent.",
                    //   type: "success",
                    // });

                    resetForm();
                    // setTimeout(() => setForgetPassword(false), 1400);
                  } catch (error) {
                    console.error(error);
                    setStatus({
                      message: "Failed to send reset email. Please try again.",
                      type: "error",
                    });
                  } finally {
                    setIsLoading(false);
                    setSubmitting(false);
                  }
                }}
              >
                {({ errors, touched, isSubmitting, handleSubmit }) => (
                  <div className="flex-1 absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 backdrop-blur-md flex flex-col items-center rounded-2xl justify-center z-50 p-6">
                    <Image
                      src="/logo/vbox.png"
                      width={80}
                      height={80}
                      alt="logo"
                      priority
                      className="relative z-10 hover:scale-110 transition-transform duration-300"
                    />
                    <p className="text-sm text-gray-300 mt-3 mb-4">
                      Reset Password
                    </p>

                    <Form className="w-full max-w-md space-y-4">
                      <InputField
                        label="Email"
                        name="resetEmail"
                        type="email"
                        placeholder="Enter your email"
                        showPassword={false}
                        error={errors.resetEmail as string | undefined}
                        touched={!!touched.resetEmail}
                      />

                      <button
                        type="button"
                        onClick={() => handleSubmit()}
                        disabled={isLoading || isSubmitting}
                        className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors w-full"
                      >
                        {isLoading || isSubmitting ? "Sending..." : "Submit"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setForgetPassword(false)}
                        className="mt-2 px-4 py-2 text-red-500 underline rounded-lg transition-colors w-full bg-transparent"
                      >
                        Close
                      </button>
                    </Form>
                  </div>
                )}
              </Formik>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white py-3.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
