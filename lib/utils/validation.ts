import * as Yup from "yup";
export const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm your new password"),
});

export const userDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d{7,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  username: Yup.string().required("Username is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
});

export const resetPasswordValidationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .min(4, "OTP must be at least 4 characters")
    .max(8, "OTP must not exceed 8 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
