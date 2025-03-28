import { io } from "socket.io-client";

const serverURL = import.meta.env.VITE_SERVER_URL;

const socket = io(serverURL,{
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
    timeout: 20000
})

export default socket;