const { users } = require("./connected-users");

const updateLastMessageStatus = (io,conversation) =>{
    io.emit('messageStatusUpdate',conversation)        
}

module.exports = updateLastMessageStatus