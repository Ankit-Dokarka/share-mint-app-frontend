import { Socket,io } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket =()=>{
    if(!socket){
        socket = io(import.meta.env.VITE_API_URL,{
            withCredentials: true,
            autoConnect: false
        })
    }
    if(!socket.connect()){
        socket.connect()
    }

    return socket;
}

export const getSocket = ()=> socket;

export const disconnectSocket = () =>{
    if(socket && socket.connect()){
        socket.disconnect()
        socket = null
    }
}

