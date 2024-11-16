import { apiClient } from "../config";
import Cookies from "js-cookie";


/////////////////////////////////////////////////////////////////////////////////////
//SIGN IN API
interface signInValueTypes  {
    email: string;
    password: string;
}
export const handleUserLogin = (data:signInValueTypes)=>{
  
        const response = apiClient.post("/auth/login", data)
        return response
   
}

/////////////////////////////////////////////////////////////////////////////////////
//SIGN UP API 
type signUpValueTypes = {
    firstName:string,
    middleName:string,
    lastName:string,
    username:string,
    dateOfBirth:Date,
    gender:"Male"|"Female",
    email:string,
    address:string,
    phoneNumber:string
}

export const handleUserRegistration= async(data:signUpValueTypes)=>{
    try {
        const response = await apiClient.post("/auth/register", data)
        return response
        
    } catch (error) {
        return error
    }
}
/////////////////////////////////////////////////////////////////////////////////////
//GET USER PROFILE INFO
export const handleGetUserProfile = async()=>{
    const response = await apiClient.get("/auth/profile")
    return response
}
/////////////////////////////////////////////////////////////////////////////////////
//GET USER PROFILE PICTURE
export const handleGetUserProfilePicture = async()=>{
    const response = await apiClient.get("/auth/profile-picture")
    return response
}

/////////////////////////////////////////////////////////////////////////////////////
//LOGOUT USER 
export const handleLogout = async()=>{
    const removeToken = await Cookies.remove("token")
    const removeUserType = await Cookies.remove("userType")
    return {removeToken, removeUserType}
}

/////////////////////////////////////////////////////////////////////////////////////
//AUTHENTICATE USER 
export const handleUserAuthentication = async()=>{
    const response = await apiClient.post("auth/authenticate")
    return response
}