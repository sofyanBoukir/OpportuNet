const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const Post = require("../models/Post");
const User = require("../models/User");


const getPost = async () =>{
    try{
        const {postId} = request.params;

        const post = await Post.findById(postId);
        if(post){
            return response.json({
                post
            })
        }

        return response.status(404).json({
            'message' : 'Post not found'
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}
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


const deletePost = async (request,response) =>{
    try{

        const userId = request.user.id;
        const {postId} = request.params;
        const user = await User.findById(userId)
        
        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const post = await Post.findOne({$and:[{user:userId},{_id:postId}]});

        if(post){
            await Post.findByIdAndDelete(postId);
            return response.json({
                'message' : 'Post deleted successfully'
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

const alreadyLiked = async (request,response) =>{
    try{

        const userId = request.user.id;
        const { postId } = request.params;
        const user = await User.findById(userId)
        
        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const post = await Post.findById(postId);
        if(!post){
            return response.status(404).json({
                'message' : 'Post not found'
            })
        }

        const alreadyLiked = await Post.findOne({likes:{$in:userId}});
        if(alreadyLiked){
            return response.json({
                'liked' : true
            })
        }else{
            return response.json({
                'liked' : false
            })
        }

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const toggleLike = async (request,response) =>{
    try{

        const userId = request.user.id;
        const { postId } = request.params;
        const user = await User.findById(userId)
        
        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const postExists = await Post.findById(postId);
        if(!postExists){
            return response.status(404).json({
                'message' : 'Post not found'
            })
        }

        const post = await Post.findOne({likes:{$in:userId}});

        if(post){
            const newLikes = post.likes.filter((_id) => _id.toString() !== userId);
            post.likes = newLikes;
            await post.save();

            return response.json({
                'liked' : false
            })
        }else{

            const notExists = await Notification.findOneAndDelete({$and:[{user:postExists.user},{from_user:userId},{post:postExists._id},{message:"Liked your post"}]});

            if(notExists){
                const newNotification = new Notification({
                    user:postExists.user,
                    from_user:userId,
                    post:postExists._id,
                    message:"Liked your post"
                })
    
                await newNotification.save()
                postExists.likes.push(userId);
                await postExists.save();

                return response.json({
                    'liked' : true
                })
            }

            const newNotification = new Notification({
                user:postExists.user,
                from_user:userId,
                post:postExists._id,
                message:"Liked your post"
            })

            await newNotification.save()

            postExists.likes.push(userId);
            await postExists.save();

            return response.json({
                'liked' : true
            })
        }

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}




module.exports = {getPost,addPost,deletePost,alreadyLiked,toggleLike}