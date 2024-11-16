"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  handleGetUserProfile,
  handleGetUserProfilePicture,
} from "./app/api/AuthApi/api";
import { authContextType, Reg, success, user, users } from "./app/types/context";
const url = process.env.NEXT_PUBLIC_BASE_URL;


//context initliaization
const userContext = createContext<authContextType>({} as authContextType);
// authenticate provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [username, setUser] = useState<users | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [superuser, setsuperuser] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<success | null>(null);
  //resgiter or sign up
  const signup = async (newUser: Reg) => {
    setIsLoading(true);
    const data = {
      firstName: newUser.firstName,
      middleName: newUser.middleName,
      lastName: newUser.lastName,
      username: newUser.username,
      dateOfBirth: newUser.dateOfBirth,
      gender: newUser.gender,
      email: newUser.email,
      address: newUser.address,
      phoneNumber: newUser.phoneNumber,
    };
  };
  //login provider for user authentication
  const loginAuthUser = async (newUser: user) => {
    setIsLoading(true);

    let data = JSON.stringify({
      username: newUser.username,
      password: newUser.password,
    });
  };
  //logout provider for user authentication
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.reload();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
  };

  useEffect(() => {
    handleGetUserProfile()
      .then((value) => {
        // console.log(value.data.user);
        setUser(value.data.user);
      })
      .catch(() => {
        setUser(null);
      });

    handleGetUserProfilePicture()
      .then((value) => {
        // console.log(value.data.profilePictureUrl);
        setUserProfilePicture(value.data.profilePictureUrl);
      })
      .catch(() => {
        setUserProfilePicture("");
      });
  }, []);

  return (
    <userContext.Provider
      value={{
        username,
        loginAuthUser,
        logout,
        success,
        isAuthenticated,
        userProfilePicture,
        isLoading,
        setIsAuthenticated,
        signup,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
export const userAuth = () => {
  const context = useContext(userContext);
  if (context == undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
