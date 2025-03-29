const express = require("express");
const isAuth = require("../middlewares/isAuth");
const {getConversations, getMessagesByConversation, startConversation, sendNewMessage, updateConversationLastMessageStatus, searchConversations} = require("../controllers/conversation");
const router = express.Router();

router.get('/getConversations',isAuth,getConversations)
router.get('/getMessagesByConversation/:conversationId',isAuth,getMessagesByConversation)
router.post('/startConversation/:otherUserId',isAuth,startConversation)
router.post('/sendNewMessage/:conversationId',isAuth,sendNewMessage)
router.put('/updateConversationLastMessageStatus/:conversationId',isAuth,updateConversationLastMessageStatus)
router.get('/searchConversations',isAuth,searchConversations)

module.exports = router;