import { apiClient } from "../config";


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