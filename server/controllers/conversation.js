const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const notifyMessageToOnlineUser = require("../sockets/real-time-messages");
const { getIO } = require("../sockets/socket");

const getConversations = async (request,response) =>{
    try{
        const userId = request.user.id;
        
        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }
        const page = parseInt(request.query.page) || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize; 

        const totalConversations = await Conversation.countDocuments({ participants: userId });
        const totalPages = Math.ceil(totalConversations / pageSize);
        const lastPage = totalPages;


        const conversations = await Conversation.find({ participants: userId })
                                            .skip(skip)
                                            .limit(pageSize)
                                            .sort({lastMessageAt:-1})
                                            .populate('job', 'title')
                                            .populate('participants', 'name headLine profile_picture profilePictureUrl')

        if(conversations.length){
            return response.json({
                'conversations' : conversations,
                'totalConversations' : totalConversations,
                'lastPage' : lastPage
            })
        }else{
            return response.status(404).json({
                'message' : 'No conversations with this user'
            })
        }
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const startConversation = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }
        
        const {otherUserId} = request.params;
        const otherUser = await User.findById(otherUserId);

        const participants = [userId,otherUserId];
        const conversation = await Conversation.findOne({participants:{$all:participants}})
        const io = getIO();

        if(conversation){
            return response.status(401).json({
                'message' : 'You are already in contact with this user'
            })
        }else{
            const newConversation = new Conversation({
                        participants,
                        lastMessage : `Hi👋, ${otherUser.name}`,
                        lastMessageSender : userId,
                        lastMessageAt : new Date(),
            })

            const newMessage = new Message({
                conversation : newConversation._id,
                sender : userId,
                message : `Hi👋, ${otherUser.name}`,
            })

            notifyMessageToOnlineUser(io,otherUserId,newMessage);

            await newConversation.save();
            await newMessage.save();

            return response.json({
                'message' : 'New message sended successfully!'
            })
        }

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}


const sendNewMessage = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }
        
        const {conversationId} = request.params;
        const { message,recipient } = request.body;

        const conversation = await Conversation.findOne({$and:[{participants:userId},{_id:conversationId}]})
        const io = getIO();

        if(conversation){
            const newMessage = new Message({
                conversation : conversation._id,
                sender : userId,
                message : message,
                recipient : recipient
            })

            await Conversation.findByIdAndUpdate(conversationId, {
                lastMessage: message,
                lastMessageSender: userId,
                lastMessageAt : new Date(),
                lastMessageStatus: "sent",
            });
            
            await newMessage.save();
            notifyMessageToOnlineUser(io,recipient,newMessage);
            return response.json({
                'message' : 'New message sended successfully!', 
                'newMessage' : newMessage
            })
        }else{
            // return response.json({
            //     'message' : 'New message sended successfully!'
            // })
        }

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const sendPostToMultipleUsers = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }
        
        const { conversations } = request.body;
        const { postId } = request.params;
        const io = getIO();

        conversations.map(async (conversation) =>{
            const toConversation = await Conversation.findById(conversation);
            const recipient = toConversation.participants.find(participant => participant.toString() !== userId.toString());
            if(toConversation){
                const newMessage = new Message({
                    sender : userId,
                    post : postId,
                    recipient,
                    conversation : toConversation._id
                })

                notifyMessageToOnlineUser(io,recipient,newMessage);
                
                await newMessage.save();
                toConversation.lastMessageSender = userId;
                toConversation.lastMessageAt = new Date();
                toConversation.lastMessage = 'Sharing a post';
                await toConversation.save();
            }
        })

        return response.json({
            'message' : 'Sent successfully!'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const searchConversations = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const { query } = request.query;
        const matchingUsers = await User.find({
            name: { $regex: `^${query}`, $options: "i" },
            _id: { $ne: userId } 
          }).select('_id');
        
          const matchingUserIds = matchingUsers.map(user => user._id);
        
          const conversations = await Conversation.find({
            $and: [
              { participants: userId }, 
              { participants: { $in: matchingUserIds } } 
            ]
          })
          .populate('participants', 'name profile_picture profilePictureUrl headLine')
          .populate('lastMessageSender', 'name')
          .sort({ lastMessageAt: -1 });

        return response.json({
            'conversations' : conversations
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const updateConversationLastMessageStatus = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const {conversationId} = request.params;        
        const conversation = await Conversation.findById(conversationId)

        if(!conversation){
            return response.status(404).json({
                'message' : 'conversation not found'
            })
        }

        if(conversation.lastMessageSender === userId){
            return response.status(400).json({
                'message' : 'Couldnt update the status'
            })
        }

        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessageStatus: "seen",
        });

        return response.json({
            'message' : 'Updated successfully!'
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
} 

const getMessagesByConversation = async (request,response) =>{
    try{
        const userId = request.user.id;
        
        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const {conversationId} = request.params;
        const conversation = await Conversation.findOne({$and:[{_id:conversationId},{participants:userId}]});
        if(!conversation){
            return response.status(401).json({
                'message' : 'Unauthorized for this action'
            })
        }

        const messages = await Message.find({conversation:conversation._id})
                        .populate({
                            path : 'post',
                            select : 'name content image user',
                            populate : {
                                path : 'user',
                                select : 'name headLine profile_picture'
                            }
                        })

        return response.json({
            'messages' : messages
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const deleteMessage = async (request,response) =>{
    try{
        const userId = request.user.id;
        
        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const { messageId } = request.params;
        const message = await Message.findOneAndDelete({$and:[{_id:messageId},{sender:userId}]});
        if(!message){
            return response.status(401).json({
                'message' : 'Unauthorized to delete this message',
            })
        }else{

            return response.json({
                'message' : 'Deleted successfully'
            })
        }

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
} 


module.exports = {getConversations, getMessagesByConversation, startConversation, sendPostToMultipleUsers, searchConversations, updateConversationLastMessageStatus, sendNewMessage, deleteMessage}