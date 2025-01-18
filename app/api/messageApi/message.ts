

import { apiClient } from "../config";
////////////////////////////////////////////////////////////////////////////////////////////////
//SEND COMMENT 
type comment ={
    comment:string; 
    liveId:string;
}
type vodcomment ={
    comment:string; 
    vodId:string;
}


export const handleSendComment = (comment:comment)=>{
    const data = JSON.stringify({
        comment:comment.comment,
        liveId:comment.liveId
    })
    const response = apiClient.post("/comment", data)
    return response
}
export const handleSendvodComment = (comment:vodcomment)=>{
    const data = JSON.stringify({
        comment:comment.comment,
        vodId:comment.vodId
    })
    const response = apiClient.post("/comment/vod", data)
    return response
}
////////////////////////////////////////////////////////////////////////////////////////////////
//GET ALL COMMENTS
export const handleGetAllComments = (liveId:string)=>{
    const response = apiClient.get(`/comment/${liveId}`)
    return response
}
export const handleGetAllVodComments = (liveId:string)=>{
    const response = apiClient.get(`/comment/vod/${liveId}`)
    return response
}
////////////////////////////////////////////////////////////////////////////////////////////////
//DELETE COMMENTS
export const handleDeleteComment = (commentId:string)=>{
    const response = apiClient.delete(`/comment/${commentId}`)  
    return response
}
////////////////////////////////////////////////////////////////////////////////////////////////
//GET STREAM DATA 
export const handleGetStreamData = (liveId:string)=>{
    const response = apiClient.get(`/live/${liveId}`)
    return response
}
////////////////////////////////////////////////////////////////////////////////////////////////
//LIKE LIVE
export const handleLikeLive = (liveId:string)=>{
    const response = apiClient.post(`/live/like/${liveId}`)
    return response
}