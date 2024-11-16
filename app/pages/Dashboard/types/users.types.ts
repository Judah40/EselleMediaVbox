export interface User {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    dateOfBirth: string; // or `Date` if you are converting it to a Date object in your code
    gender: "Male" | "Female" ; // Assuming a fixed set of values for gender
    email: string;
    password: string;
    address: string;
    role: "Admin" | "User" // Adjust according to your role definitions
    phoneNumber: string;
    profile_picture: string;
    otp: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string; // or `Date` if handling as a Date
    updatedAt: string; // or `Date` if handling as a Date
  }
  