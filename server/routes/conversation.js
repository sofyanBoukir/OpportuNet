const express = require("express");
const isAuth = require("../middlewares/isAuth");
const {getConversations, getMessagesByConversation, startConversation, sendNewMessage, updateConversationLastMessageStatus, searchConversations, sendPostToMultipleUsers, deleteMessage} = require("../controllers/conversation");
const router = express.Router();

router.get('/getConversations',isAuth,getConversations)
router.get('/getMessagesByConversation/:conversationId',isAuth,getMessagesByConversation)
router.post('/startConversation/:otherUserId',isAuth,startConversation)
router.post('/sendNewMessage/:conversationId',isAuth,sendNewMessage)
router.post('/sendPostToMultipleUsers/:postId',isAuth,sendPostToMultipleUsers)
router.put('/updateConversationLastMessageStatus/:conversationId',isAuth,updateConversationLastMessageStatus)
router.get('/searchConversations',isAuth,searchConversations)
router.delete('/deleteMessage/:messageId',isAuth,deleteMessage)

module.exports = router;