// SignupForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "@/app/lib/signupValidation";
import { UserAuth } from "@/useContext";
import { Reg } from "@/app/types/context";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text", optional = false }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-white">
      {label}{" "}
      {optional && <span className="text-gray-400 text-xs">(optional)</span>}
    </label>
    <Field
      type={type}
      name={name}
      id={name}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
    />
    <ErrorMessage
      name={name}
      component="p"
      className="text-sm text-red-600 mt-1"
    />
  </div>
);

const SignupForm = () => {
  const { isLoading, signup } = UserAuth();

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpValidationSchema}
      onSubmit={signup}
    >
      <Form className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Username" name="username" />
          <InputField label="First Name" name="firstName" />
          <InputField label="Last Name" name="lastName" />
          <InputField label="Middle Name" name="middleName" optional />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Email" name="email" type="email" />
          <InputField label="Phone Number" name="phoneNumber" />
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Address" name="address" />
          <InputField label="Date of Birth" name="dateOfBirth" type="date" />
        </div>

        {/* Gender Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Gender</label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <Field type="radio" name="gender" value="Male" className="mr-3" />
              <span className="text-white">Male</span>
            </label>
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <Field
                type="radio"
                name="gender"
                value="Female"
                className="mr-3"
              />
              <span className="text-white">Female</span>
            </label>
          </div>
          <ErrorMessage
            name="gender"
            component="p"
            className="text-sm text-red-600 mt-1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </Form>
    </Formik>
  );
};

export default SignupForm;
