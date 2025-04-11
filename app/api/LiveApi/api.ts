import { apiClient } from "../config"
// import { FormValues } from "./api.types"



////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE API KEY
export const handleCreateApiKey =async ()=>{
    const response  = await apiClient.post('/stream/generate-key')
    return response
}


////////////////////////////////////////////////////////////////////////////////////////////////
//GO LIVE 

  
export const handleGoLive =async (data:FormData)=>{
    const response  = await apiClient.post('/live/create',data)
    return response
}
////////////////////////////////////////////////////////////////////////////////////////////////
//DELETE API KEY
// export const handleDeleteApiKey =async (id:number)=>{}

////////////////////////////////////////////////////////////////////////////////////////////////
//GET ALL LIVESTREAMS
export const handleGetAllLiveStreams =async ()=>{
    const response  = await apiClient.get('/live/channel')
    return response
}