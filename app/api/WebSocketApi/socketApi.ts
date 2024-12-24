import { Manager } from "socket.io-client";

////////////////////////////////////////////////////////////////////////////////////
// FUNCTION FOR ESTABLISHING CONNECTION
export const createSocketConnection = (token: string) => {
  const manager = new Manager("http://localhost:4000", {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    auth: {
      token: token, // Correctly pass the token in the Manager options
    },
  });

  const socket = manager.socket("/"); // Now, we just specify the namespace here

  // Add any other socket event handlers if needed
  socket.on("connect", () => {
    
  });

  socket.on("connect_error", (err: Error) => {
    console.error("Connection Error:", err.message);
  });

  return socket;
};



// import {Manager} from "socket.io-client"

// ////////////////////////////////////////////////////////////////////////////////////
// //FUNCTION FOR ESTABLISHING CONNECTION
// export const createSocketConnection = (token:string)=>{
//     const manager = new Manager("http://localhost:4000", {
//         reconnectionAttempts:5,
//         reconnectionDelay:1000,
//     })
//     const socket = manager.socket("/", {
//         auth:{
//             token:token
//         }
//     })
    
//     // Add any other socket event handlers if needed
//     socket.on("connect", () => {
//         
//     });
    
//     socket.on("connect_error", (err) => {
//         console.error("Connection Error:", err.message);
//         // 
//     });
//     return socket
// }