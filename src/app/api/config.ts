import axios, { InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
const apiUrl = process.env.NEXT_PUBLIC_API_URL
/////////////////////////////////////////////////////////////////////////////////
//API CUSTOM CONFIG
export const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    }, 
    timeout: 5000,
})
/////////////////////////////////////////////////////////////////////////////////
//GET COOKIES
export const getCookie = (name: string) => {
    return Cookies.get(name)
}
/////////////////////////////////////////////////////////////////////////////////
//REQUEST INTERCEPTORS
apiClient.interceptors.request.use(
    async(config:InternalAxiosRequestConfig<any>)=>{
        // HANDLING OF REQUEST AND SETTING BEARER TOKEN 
      const token = getCookie("token")
      if(token){
        config.headers["Authorization"] = `Bearer ${token}`
      }

        return config
    },
    (error) => {
        //PASSING ERROR TO THE NEXT CATCH() BLOCK
        return Promise.reject(error)
    }
)


/////////////////////////////////////////////////////////////////////////////////
//RESPONSE INTERCEPTORS
// apiClient.interceptors.response.use(
//     //HANDLING RESPONSE INTERCEPTORS TO ONLY RETURN RESPONSE.DATA
//    async (response) => {
//     return response.data
//     },
//     (error) => {
//         //PASSING ERROR TO THE NEXT CATCH() BLOCK
//         if(error.response){
//             if(error.response.status===500){
//                 console.log("Server Error Please try again later")
//             }
//         }
//         return Promise.reject(error)
//     }
// )