import { Post } from "../pages/Home/home.data";

export type success = {
    status: string;
    message: string;
  };
  //define the context type
 export  type users = {
    address: string;
    dateOfBirth: string;
    email: string;
    firstName: string;
    gender: string;
    isActive: boolean;
    lastName: string;
    phoneNumber: string;
    profile_picture: string;
    username: string;
    role: string;
  };
  export type user = {
    username: string;
    password: string;
  };
  //register type
  export type Reg = {
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    address: string;
    phoneNumber: string;
  };
  export interface authContextType {
    username: users | null;
    loginAuthUser: (user: user) => void;
    logout: () => void;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    signup: (newUser: Reg) => void;
    isLoading: boolean;
    success: success | null;
    userProfilePicture: string | null;
    posts: Post[];
  }