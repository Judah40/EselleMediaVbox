import { Reg } from "@/app/types/context";
import { apiClient } from "../config";
import Cookies from "js-cookie";

/////////////////////////////////////////////////////////////////////////////////////
//SIGN IN API
interface signInValueTypes {
  email: string;
  password: string;
}
export const handleUserLogin = (data: signInValueTypes) => {
  const response = apiClient.post("/auth/login", data);
  return response;
};

/////////////////////////////////////////////////////////////////////////////////////
//SIGN UP API
export type signUpValueTypes = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  dateOfBirth?: string;
  gender?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
};
/////////////////////////////////////////////////////////////////////////////////////
//PASSWORD SETUP
type passwordSetupValueTypes = {
  password: string;
  confirmPassword: string;
};
export const handleSettingUpPassword = (datas: passwordSetupValueTypes) => {
  const data = {
    password: datas.password,
  };
  const response = apiClient.post("/auth/password-setup", data);
  return response;
};
export const handleUserRegistration = async (data: Reg) => {
  const response = await apiClient.post("/auth/register", data);
  return response;
};
/////////////////////////////////////////////////////////////////////////////////////
//GET USER PROFILE INFO
export const handleGetUserProfile = async () => {
  const response = await apiClient.get("/auth/profile");
  return response;
};
/////////////////////////////////////////////////////////////////////////////////////
//GET USER PROFILE PICTURE
export const handleGetUserProfilePicture = async () => {
  const response = await apiClient.get("/auth/profile-picture");
  return response;
};

/////////////////////////////////////////////////////////////////////////////////////
//ADD FAVROITES

type favoritesType = {
  name: string;
};
export type favoritesArray = {
  name: favoritesType[];
};

export const handleAddingFavorites = async (favorite: string[]) => {
  //
  const data = {
    favorites: favorite,
  };
  const response = await apiClient.post("/favorite/create", data);
  return response;
};

/////////////////////////////////////////////////////////////////////////////////////
//VERIFY OTP
export const handleOTPVerification = async (otp: string) => {
  const data = {
    OTP: otp,
  };
  const response = await apiClient.post("/auth/verify-OTP", data);
  return response;
};
/////////////////////////////////////////////////////////////////////////////////////
//LOGOUT USER
export const handleLogout = async () => {
  const removeToken = await Cookies.remove("token");
  const removeUserType = await Cookies.remove("userType");
  return { removeToken, removeUserType };
};

/////////////////////////////////////////////////////////////////////////////////////
//UPLOAD PROFILE PICTURE
export const handleUploadProfilePicture = async (file: File) => {
  const formData = new FormData();
  formData.append("profile_picture", file);
  const response = await apiClient.post("/auth/profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Set content type for file uploads
    },
  });
  return response;
};
/////////////////////////////////////////////////////////////////////////////////////
//AUTHENTICATE USER
export const handleUserAuthentication = async () => {
  const response = await apiClient.post("/auth/authenticate");
  return response;
};

export const updateUserProfile = async (payload: signUpValueTypes) => {
  const response = await apiClient.put("/auth/profile", payload);
  return response;
};

export const handleGetFavorite = async () => {
  const response = await apiClient("/favorite");
  return response;
};

interface passwordReset {
  oldPassword: string;
  newPassword: string;
}
export const resetPassword = async (payload: passwordReset) => {
  const response = await apiClient.patch("/auth/password", payload);
  return response;
};

//FORGET PASSWORD
//EMAIL VERIFICATION
export const handleForgotPasswordEmailVerification = async (email: string) => {
  const data = {
    email: email,
  };
  const response = await apiClient.post("/auth/forget-password", data);
  return response;
};

//RESET FORGOT PASSWORD
export const handleResetForgotPassword = async ({
  newPassword,
  otp,
}: {
  newPassword: string;
  otp: string;
}) => {
  const data = {
    newPassword,
    OTP: otp,
  };
  const response = await apiClient.patch("/auth/reset-password", data);
  return response;
};
