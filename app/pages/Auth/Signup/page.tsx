"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { signUpValidationSchema } from "@/app/lib/signupValidation";
import { UserAuth } from "@/useContext";
import { Reg } from "@/app/types/context";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
// import Image from "next/image";

interface StepProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  isLastStep: boolean;
}

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  optional = false,
  icon,
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-300">
      {label}{" "}
      {optional && <span className="text-gray-500 text-xs">(optional)</span>}
    </label>
    <div className="relative group">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
          {icon}
        </div>
      )}
      <Field
        type={type}
        name={name}
        id={name}
        className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500 backdrop-blur-sm hover:bg-white/10 ${
          icon ? "pl-11" : ""
        }`}
      />
    </div>
    <ErrorMessage
      name={name}
      component="div"
      className="text-sm text-red-400 flex items-center gap-1 animate-in slide-in-from-top-1"
    >
      {(msg) => (
        <>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {msg}
        </>
      )}
    </ErrorMessage>
  </div>
);

const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  const steps = ["Account", "Personal", "Contact", "Review"];

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center relative z-10">
            <motion.div
              className={`rounded-full flex items-center justify-center w-11 h-11 font-semibold transition-all shadow-lg
                ${
                  i < currentStep
                    ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/30"
                    : i === currentStep
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/50 ring-4 ring-cyan-500/20"
                    : "bg-white/5 text-gray-400 border-2 border-white/10"
                }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: i === currentStep ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {i < currentStep ? <CheckCircle className="w-6 h-6" /> : i + 1}
            </motion.div>
            <div
              className={`text-xs mt-3 font-medium transition-colors ${
                i <= currentStep ? "text-cyan-400" : "text-gray-500"
              }`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StepNavigation: React.FC<StepProps> = ({
  currentStep,
  onNext,
  onPrev,
  isSubmitting,
  isLastStep,
}) => {
  return (
    <div className="flex justify-between pt-6 mt-8 gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentStep === 0}
        className="flex items-center gap-2 px-6 py-3.5 text-sm font-medium rounded-xl border-2 border-white/20
                 hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/20
                 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <button
        type={isLastStep ? "submit" : "button"}
        onClick={isLastStep ? undefined : onNext}
        disabled={isSubmitting}
        className="flex items-center gap-2 px-8 py-3.5 text-sm font-medium rounded-xl 
                 bg-gradient-to-r from-cyan-600 to-blue-600 text-white 
                 hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 
                 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 
                 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl 
                 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {isLastStep ? "Creating..." : "Processing..."}
          </>
        ) : (
          <>
            {isLastStep ? "Create Account" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};

const AccountStep = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
        Create Your Account
      </h2>
      <p className="text-gray-400 text-sm">
        Let&lsquo;s start with your username
      </p>
    </div>
    <InputField label="Username" name="username" icon={<User size={16} />} />
  </motion.div>
);

const PersonalStep = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
        Personal Information
      </h2>
      <p className="text-gray-400 text-sm">Tell us about yourself</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField
        label="First Name"
        name="firstName"
        icon={<UserCircle size={16} />}
      />
      <InputField
        label="Last Name"
        name="lastName"
        icon={<UserCircle size={16} />}
      />
    </div>

    <InputField
      label="Middle Name"
      name="middleName"
      optional
      icon={<UserCircle size={16} />}
    />

    <InputField
      label="Date of Birth"
      name="dateOfBirth"
      type="date"
      icon={<Calendar size={16} />}
    />

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Gender</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label
          className="relative flex items-center p-4 border-2 border-white/10 rounded-xl cursor-pointer 
                        hover:border-cyan-500/50 hover:bg-white/5 transition-all group"
        >
          <Field
            type="radio"
            name="gender"
            value="Male"
            className="w-5 h-5 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 bg-white/5 border-white/20"
          />
          <span className="text-white ml-3 font-medium">Male</span>
        </label>
        <label
          className="relative flex items-center p-4 border-2 border-white/10 rounded-xl cursor-pointer 
                        hover:border-cyan-500/50 hover:bg-white/5 transition-all group"
        >
          <Field
            type="radio"
            name="gender"
            value="Female"
            className="w-5 h-5 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 bg-white/5 border-white/20"
          />
          <span className="text-white ml-3 font-medium">Female</span>
        </label>
      </div>
      <ErrorMessage
        name="gender"
        component="div"
        className="text-sm text-red-400 flex items-center gap-1 mt-2"
      >
        {(msg) => (
          <>
            <AlertCircle className="w-4 h-4" />
            {msg}
          </>
        )}
      </ErrorMessage>
    </div>
  </motion.div>
);

const ContactStep = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
        Contact Information
      </h2>
      <p className="text-gray-400 text-sm">How can we reach you?</p>
    </div>

    <InputField
      label="Email"
      name="email"
      type="email"
      icon={<Mail size={16} />}
    />
    <InputField
      label="Phone Number"
      name="phoneNumber"
      icon={<Phone size={16} />}
    />
    <InputField label="Address" name="address" icon={<MapPin size={16} />} />
  </motion.div>
);

const ReviewStep = ({ values }: { values: Reg }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
        Review Your Information
      </h2>
      <p className="text-gray-400 text-sm">
        Make sure everything looks correct
      </p>
    </div>

    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Account
        </h3>
        <div className="pl-7 space-y-2">
          <div>
            <p className="text-sm text-gray-400">Username</p>
            <p className="text-white font-medium">{values.username}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
          <UserCircle className="w-5 h-5" />
          Personal
        </h3>
        <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Full Name</p>
            <p className="text-white font-medium">
              {values.firstName}{" "}
              {values.middleName ? values.middleName + " " : ""}
              {values.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Date of Birth</p>
            <p className="text-white font-medium">{values.dateOfBirth}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Gender</p>
            <p className="text-white font-medium">{values.gender}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact
        </h3>
        <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-white font-medium break-all">{values.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Phone</p>
            <p className="text-white font-medium">{values.phoneNumber}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-gray-400">Address</p>
            <p className="text-white font-medium">{values.address}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 backdrop-blur-sm">
      <p className="text-sm text-gray-300 text-center">
        By creating an account, you agree to our{" "}
        <Link
          href="/terms"
          className="text-cyan-400 hover:text-cyan-300 font-medium underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-cyan-400 hover:text-cyan-300 font-medium underline"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  </motion.div>
);

const SignupPage = () => {
  const { isLoading, signup } = UserAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  const handleNextStep = () => {
    setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const initialValues: Reg = {
    username: "",
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  };

  const stepValidationSchemas = [
    signUpValidationSchema.pick(["username"]),
    signUpValidationSchema.pick([
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
    ]),
    signUpValidationSchema.pick(["email", "phoneNumber", "address"]),
    signUpValidationSchema,
  ];

  const handleSubmit = async (values: Reg, actions: FormikHelpers<Reg>) => {
    if (currentStep < totalSteps - 1) {
      handleNextStep();
      actions.setSubmitting(false);
    } else {
      await signup(values);
    }
  };

  const renderStep = (values: Reg) => {
    switch (currentStep) {
      case 0:
        return <AccountStep />;
      case 1:
        return <PersonalStep />;
      case 2:
        return <ContactStep />;
      case 3:
        return <ReviewStep values={values} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden py-12 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-3xl">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/30 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Join Us Today
            </h1>
            <p className="text-gray-400">
              Create your account in just a few steps
            </p>
          </div>

          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <Formik
            initialValues={initialValues}
            validationSchema={stepValidationSchemas[currentStep]}
            onSubmit={handleSubmit}
            validateOnMount={false}
            validateOnChange={false}
            validateOnBlur={true}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-6">
                <AnimatePresence mode="wait">
                  {renderStep(values)}
                </AnimatePresence>

                <StepNavigation
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                  isSubmitting={isSubmitting || isLoading}
                  isLastStep={currentStep === totalSteps - 1}
                />
              </Form>
            )}
          </Formik>

          {/* Sign In Link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/pages/Auth/Signin"
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 hover:underline-offset-4 transition-all inline-flex items-center gap-1 group"
              >
                Sign In
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
