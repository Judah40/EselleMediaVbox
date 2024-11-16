import {Manager} from "socket.io-client"
import { apiUrl } from "../config"

////////////////////////////////////////////////////////////////////////////////////
//FUNCTION FOR ESTABLISHING CONNECTION
export const createSocketConnection = (token:string)=>{
    const manager = new Manager("http://localhost:4000", {
        reconnectionAttempts:5,
        reconnectionDelay:1000,
    })
    const socket = manager.socket("/", {
        auth:{
            token:token
        }
    })
    
    // Add any other socket event handlers if needed
    socket.on("connect", () => {
        console.log("Connected to the server with socket ID:", socket.id);
    });
    
    socket.on("connect_error", (err) => {
        console.error("Connection Error:", err.message);
        // console.log("this is the toke:",token);
    });
    return socket
}