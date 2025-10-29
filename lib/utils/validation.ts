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
