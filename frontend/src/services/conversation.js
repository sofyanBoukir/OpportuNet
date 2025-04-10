import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getConversations = async (token, page) => {
  const response = await axios.get(
    `${serverUrl}/conversation/getConversations?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getMessagesByConversation = async (token, conversationId) => {
  const response = await axios.get(
    `${serverUrl}/conversation/getMessagesByConversation/${conversationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const startNewConversation = async (token, otherUserId) => {
  const response = await axios.post(
    `${serverUrl}/conversation/startConversation/${otherUserId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const sendNewMessage = async (token, conversationId, data) => {
  const response = await axios.post(
    `${serverUrl}/conversation/sendNewMessage/${conversationId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};


export const sendPostToMultipleUsers = async (token,postId,conversations) =>{
  const response = await axios.post(`${serverUrl}/conversation/sendPostToMultipleUsers/${postId}`,{conversations},{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response;
}

export const updateConversationLastMessageStatus = async (
  token,
  conversationId
) => {
  const response = await axios.put(
    `${serverUrl}/conversation/updateConversationLastMessageStatus/${conversationId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};



export const searchConversations = async (token,query) =>{
  const response = await axios.get(`${serverUrl}/conversation/searchConversations?query=${query}`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response;
}


export const deleteMessage = async (token,messageId) =>{
  const response = await axios.delete(`${serverUrl}/conversation/deleteMessage/${messageId}`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response;
}


export const getOnlineUsers = async (token) =>{
  const response = await axios.get(`${serverUrl}/conversation/getOnlineUsers`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response;
}