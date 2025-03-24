const { Server } = require("socket.io");
const { registerUser, users } = require("./connected-users");
const getMissedNotifications = require("./missed-notifications");

let io;

const initialSocket = (server) =>{
    io = new Server(server,{
        cors :{
            origin : "*",
    } 
    })
    
    io.on('connection',(socket) =>{
    console.log('user connected ' + socket.id);
    
    socket.on('registerUser',async (token) =>{
        userId = registerUser(token,socket.id);
        missedNotifications = await getMissedNotifications(userId);
    
        if(missedNotifications.length > 0){
            io.to(users[userId]).emit('missedNotifications',missedNotifications);
        }
    })
    
    socket.on('disconnect',() =>{
        console.log('user disconnected '+socket.id);
    })
    })

    return io;
}

const getIO = () =>{
    return io;
}

module.exports = { initialSocket , getIO }