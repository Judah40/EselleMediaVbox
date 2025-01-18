"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { handleSettingUpPassword } from "@/app/api/AuthApi/api";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface FormState {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

const PasswordSetup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validateForm = (values: FormState): FormErrors => {
    const errors: FormErrors = {};

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])/.test(values.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(values.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(values.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
      errors.password = "Password must contain at least one special character";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const validationErrors = validateForm({
        ...formData,
        [name]: value,
      });
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur
    const validationErrors = validateForm(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof FormErrors],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate all fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setTouched({
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      // Handle form submission here
      await handleSettingUpPassword(formData)
        .then(() => {
          router.push("/pages/Extras/Favorites");
        })
        .catch((error) => {
          alert(`Error ; ${error.response.data.message}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const getPasswordStrength = (
    password: string
  ): { text: string; color: string } => {
    if (!password) return { text: "", color: "" };
    if (password.length < 8) return { text: "Weak", color: "text-red-500" };
    if (password.length < 12)
      return { text: "Moderate", color: "text-yellow-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create Password
          </CardTitle>
          <p className="text-center text-gray-400 mt-2">
            Please create a secure password
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.password}
                  className="w-full px-4 py-2 text-white bg-black rounded-lg 
                           border-2 border-gray-600 focus:border-blue-500 
                           focus:ring-2 focus:ring-blue-500 focus:outline-none
                           pr-10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              {formData.password && (
                <p className={`text-sm ${strength.color}`}>
                  Password strength: {strength.text}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.confirmPassword}
                  className="w-full px-4 py-2 text-white bg-black rounded-lg 
                           border-2 border-gray-600 focus:border-blue-500 
                           focus:ring-2 focus:ring-blue-500 focus:outline-none
                           pr-10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="text-sm text-gray-400 space-y-1">
              <p>Password must contain:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character (!@#$%^&*)</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg
                       transition-colors duration-200"
            >
              {isLoading ? <Spinner /> : <p>Create Password</p>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordSetup;
