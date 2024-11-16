
import { apiClient } from "../../config"

////////////////////////////////////////////////////////////////////////////////////////////////
//GET ALL USERS
export const handleGetAllUsers =async ()=>{
    const response = await apiClient.get("admin/user")
    return response
}
////////////////////////////////////////////////////////////////////////////////////////////////
//ACTIVATE USER
export const handleActivateUser =async (id:number)=>{
    const response = await apiClient.put(`admin/user/activate/${id}`)
    return response
}
////////////////////////////////////////////////////////////////////////////////////////////////
//DEACTIVATE USER
export const handleDeActivateUser =async (id:number)=>{

    const response = await apiClient.put(`admin/user/deactivate/${id}`)
    return response
}
////////////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE USER
export const handleGetSingleUser =async (id:string)=>{
    const response = await apiClient.put(`admin/user/${id}`)
    return response}