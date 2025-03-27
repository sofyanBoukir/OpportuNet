const Conversation = require("../models/Conversation")

const getUnseenConversations = async (userId) => {
    try {  
      const unseenConversations = await Conversation.find({
        participants: userId,
        lastMessageSender: { $ne: userId }, 
        lastMessageStatus: 'sent',
      })
        .populate("participants", "name profile_picture profilePictureUrl")
        .populate("lastMessageSender", "name");
  
      return unseenConversations;
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports = getUnseenConversations