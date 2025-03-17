const Notification = require("../models/Notification");
const Post = require("../models/Post");
const User = require("../models/User");

const addPost = async (request,response) =>{
    try{
        const { content, tags, mentionsIds } = request.body;
        const imageUrl = request.file ? `/posts/${request.file.filename}` : null;

        const userId = request.user.id;

        const user = await User.findById(userId)
        
        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const newPost = new Post({
            user : userId, 
            content,
            tags,
            mentions : mentionsIds,
            image : imageUrl
        })

        await newPost.save();
        if(mentionsIds){
            const notifications = mentionsIds.map((mentionId) => {
                return new Notification({
                    user: mentionId,
                    from_user: userId,
                    post: newPost._id,
                    message: 'Mentioned you in a post',
                });
            });
            await Notification.insertMany(notifications);
            return response.json({
                'message' : 'Posted successfully!'
            })
        }
        return response.json({
            'message' : 'Posted successfully!'
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

module.exports = {addPost}