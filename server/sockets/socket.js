const { Server } = require("socket.io");
const { registerUser, users } = require("./connected-users");
const getMissedNotifications = require("./missed-notifications");
const getUnseenConversations = require("./missed-messages");

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
        unseenConversations = await getUnseenConversations(userId);

        if(missedNotifications.length > 0){
            io.to(users[userId]).emit('missedNotifications',missedNotifications);
        }

        if(unseenConversations.length > 0){
            io.to(users[userId]).emit('missedMessages',unseenConversations);
        }
    })
    
    socket.on('disconnect',() =>{
        console.log('user disconnected '+socket.id);
        var disconnectedUser = null;
        for (const userId in users) {
            if (users[userId] === socket.id) {
                disconnectedUser = userId
                delete users[userId]; 
                break; 
            }
        }
    
        io.emit('updateOnlineUsers', disconnectedUser);
    })
    })

    return io;
}

const getIO = () =>{
    return io;
}

module.exports = { initialSocket , getIO }