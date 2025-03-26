const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

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
        const pageSize = 8;
        const skip = (page - 1) * pageSize; 

        const totalConversations = await Conversation.countDocuments({ participants: userId });
        const totalPages = Math.ceil(totalConversations / pageSize);
        const lastPage = totalPages;


        const conversations = await Conversation.find({ participants: userId })
                                            .skip(skip)
                                            .limit(pageSize)
                                            .sort({updatedAt:-1})
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

        const messages = await Message.find({conversation:conversation._id});

        return response.json({
            'messages' : messages
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}


module.exports = {getConversations, getMessagesByConversation}