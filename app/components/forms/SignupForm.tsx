// SignupForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { signUpValidationSchema } from "@/app/lib/signupValidation";
import { UserAuth } from "@/useContext";
import { Reg } from "@/app/types/context";
import { motion } from "framer-motion";
import { CheckCircle, User, Mail, Phone, MapPin, Calendar, UserCircle } from "lucide-react";

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
  icon
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-white">
      {label}{" "}
      {optional && <span className="text-gray-400 text-xs">(optional)</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <Field
        type={type}
        name={name}
        id={name}
        className={`w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-white shadow-sm ${icon ? 'pl-10' : ''}`}
      />
    </div>
    <ErrorMessage
      name={name}
      component="p"
      className="text-sm text-red-500 mt-1"
    />
  </div>
);

const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`rounded-full flex items-center justify-center w-10 h-10 text-sm font-medium transition-all
              ${i < currentStep 
                ? 'bg-green-500 text-white' 
                : i === currentStep 
                  ? 'bg-yellow-600 text-white border-2 border-yellow-400 ring-4 ring-yellow-600/30' 
                  : 'bg-gray-700 text-gray-300'}`}>
              {i < currentStep ? <CheckCircle className="w-5 h-5" /> : i + 1}
            </div>
            <div className="text-xs mt-2 font-medium text-gray-400">
              {i === 0 ? 'Account' : 
               i === 1 ? 'Personal' : 
               i === 2 ? 'Contact' : 'Review'}
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex items-center mt-4">
        <div className="w-full bg-gray-700 h-1">
          <div 
            className="bg-yellow-600 h-1 transition-all"
            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const StepNavigation: React.FC<StepProps> = ({ 
  currentStep, 
  onNext, 
  onPrev, 
  isSubmitting,
  isLastStep
}) => {
  return (
    <div className="flex justify-between pt-6 mt-8 border-t border-gray-700">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentStep === 0}
        className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-600 
                 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 
                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        Back
      </button>
      <button
        type={isLastStep ? "submit" : "button"}
        onClick={isLastStep ? undefined : onNext}
        disabled={isSubmitting}
        className="px-5 py-2.5 text-sm font-medium rounded-lg bg-yellow-600 text-white 
                 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 
                 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            {isLastStep ? "Creating Account..." : "Processing..."}
          </div>
        ) : isLastStep ? (
          "Create Account"
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
};

// Step 1: Account Information
const AccountStep = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-xl font-bold text-white mb-6">Create Your Account</h2>
    <div className="space-y-4">
      <InputField 
        label="Username" 
        name="username" 
        icon={<User size={16} />} 
      />
    </div>
  </motion.div>
);

// Step 2: Personal Information
const PersonalStep = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    
    <div className="space-y-4">
      <InputField 
        label="Date of Birth" 
        name="dateOfBirth" 
        type="date" 
        icon={<Calendar size={16} />} 
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">Gender</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer 
                        hover:bg-gray-700 transition-colors group">
          <Field type="radio" name="gender" value="Male" className="w-5 h-5 text-yellow-600" />
          <span className="text-white ml-3 group-hover:text-white">Male</span>
        </label>
        <label className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer 
                        hover:bg-gray-700 transition-colors group">
          <Field type="radio" name="gender" value="Female" className="w-5 h-5 text-yellow-600" />
          <span className="text-white ml-3 group-hover:text-white">Female</span>
        </label>
      </div>
      <ErrorMessage
        name="gender"
        component="p"
        className="text-sm text-red-500 mt-1"
      />
    </div>
  </motion.div>
);

// Step 3: Contact Information
const ContactStep = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
    <div className="space-y-4">
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
      <InputField 
        label="Address" 
        name="address" 
        icon={<MapPin size={16} />} 
      />
    </div>
  </motion.div>
);

// Step 4: Review Information
const ReviewStep = ({ values }: { values: Reg }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-xl font-bold text-white mb-6">Review Your Information</h2>
    
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium text-yellow-400 mb-4">Account</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-400">Username</p>
              <p className="text-white">{values.username}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-yellow-400 mb-4">Personal</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-white">
                {values.firstName} {values.middleName ? values.middleName + ' ' : ''}{values.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Date of Birth</p>
              <p className="text-white">{values.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Gender</p>
              <p className="text-white">{values.gender}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-yellow-400 mb-4">Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white">{values.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="text-white">{values.phoneNumber}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-400">Address</p>
              <p className="text-white">{values.address}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          By clicking &quot;Create Account&quot;, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  </motion.div>
);

const SignupForm = () => {
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

  // Custom step validation
  const stepValidationSchemas = [
    signUpValidationSchema.pick(["username"]),
    signUpValidationSchema.pick(["firstName", "lastName", "dateOfBirth", "gender"]),
    signUpValidationSchema.pick(["email", "phoneNumber", "address"]),
    // Final step doesn't need extra validation
    signUpValidationSchema
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
    <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
      <h1 className="text-2xl font-bold text-white text-center mb-8">Create Your Account</h1>
      
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
            {renderStep(values)}
            
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
    </div>
  );
};

export default SignupForm;