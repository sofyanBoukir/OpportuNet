import { FaceSmileIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AppSelector } from '../../selectors/AppSelector'
import { Textarea } from '../UI/Textarea';
import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Button } from '../UI/Button';
import { searchHashTags, searchUsers } from '../../services/profile';
import { ERROR_MESSAGES } from '../../constants/Errors';
import { Notification } from '../UI/Notification';
import { addPost } from '../../services/post';
const authService = import.meta.env.VITE_SERVER_URL;

export const AddPost = ({setAddPost}) => {
    const { userData } = AppSelector(); 
    const [showPicker, setShowPicker] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [showHashTags,setShowHashTags] = useState(false)
    const [postData, setPostData] = useState({
        content: "",
        tags: [],
        mentions: [],
        mentionsIds: [],
        image: null,
    });
    const [notification,setNotification] = useState(null)
    const [loading,setLoading] = useState(false)

    const [searchResults, setSearchResults] = useState([]);
    const [hashTagResults, setHashTagResults] = useState([]);
    const [disablePostButton,setDisablePostButton] = useState(false)

    const [searchQuery, setSearchQuery] = useState("");

    const _searchUsers = async (query) => {
        if (!query) return;
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const response = await searchUsers(token, query);
            if (response?.data) {
                setSearchResults(response.data.users);
            }
        } catch (error) {
            console.error("Error searching users", error);
        }
    };

    const _searchHashTags = async (query) => {
        if (!query) return;
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const response = await searchHashTags(token, query);
            console.log(response);
            
            if (response?.data) {
                setHashTagResults(response.data.hashTags);
            }
        } catch (error) {
            console.error("Error searching users", error);
        }
    };

    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setPostData((prev) => ({ ...prev, content: value }));

        // Detect mentions (@)
        const matchMention = value.match(/@(\w*)$/);
        if (matchMention && matchMention[1].length > 0) {
            setShowTags(true);
            setSearchQuery(matchMention[1]); 
            _searchUsers(matchMention[1]);
        } else {
            setShowTags(false);
        }

        const matchHashtag = value.match(/#(\w*)$/);
        if (matchHashtag && matchHashtag[1].length > 0) {
            setShowHashTags(true);
            setSearchQuery(matchHashtag[1]);
            _searchHashTags(matchHashtag[1])
        }else {
            setShowHashTags(false);
        }
    };
    

    const selectUser = (user) => {
        const updatedContent = postData.content.replace(
            /@\w*$/,
            ` @${user.name} `
        );
        if(postData.mentions.some((mention) => mention._id === user._id)){
            return
        }
    
        setPostData((prev) => ({
            ...prev,
            content: updatedContent,
            mentions: prev.mentions.some((m) => m._id === user._id) ? prev.mentions : [...prev.mentions, user],
            mentionsIds : prev.mentions.some((m) => m._id === user._id) ? prev.mentionsIds : [...prev.mentionsIds, user._id] 
        }));
        setShowTags(false);
    };

    const selectHashtag = (hashtag) => {
        const updatedContent = postData.content.replace(
            /#\w*$/,
            ` ${hashtag} `
        );
        
        if(postData.tags.includes(hashtag)){
            return
        }
        
        setPostData((prev) => ({
            ...prev,
            content: updatedContent,
            tags: [...prev.tags, hashtag],
        }));
        setShowHashTags(false)
    };

    const handleEmojiClick = (emojiObject) => {
        setPostData((prevData) => ({
            ...prevData,
            content: prevData.content + emojiObject.emoji,
        }));
        setShowPicker(false);
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setPostData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async () =>{
        try{
            setNotification(null);
            setLoading(true)
            const response = await addPost(localStorage.getItem('token'),postData);
            console.log(response);
            
            setLoading(false)
            if(response.status === 200){
                setNotification({type:'success',message:response.data.message})
                setDisablePostButton(true)
            }
            
        }catch(err){
            setLoading(false)
            switch(err.response.status){
                case 401:
                    setNotification({type:"error",message:err.response.data.message})
                    break
                case 500:
                    setNotification({type:"error",message:ERROR_MESSAGES.SOMETHING_WENT_WRONG})
                    break
            }
        }
    }

    
  return (
    <div className="z-20 fixed inset-0 flex items-center bg-black/50 text-gray-700 justify-center backdrop-blur-xs">
        <div className="bg-white w-[90%] lg:w-[50%] px-8 py-6 rounded-lg shadow-xl">
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img src={`${authService}` + userData.profile_picture} className="rounded-full w-12 h-12 object-cover"/>
                    <div>
                        <p className='text-xl font-semibold'>{userData.name}</p>
                        <span>This post will be visible to anyone</span>
                    </div>
                </div>
                <div>
                    <div className='text-xl w-10 h-10 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-200 duration-200'>
                        <XMarkIcon className='w-8 h-8' onClick={() => setAddPost(false)}/>
                    </div>
                </div>
            </div>

            <div className='mt-6 relative'>
                <Textarea value={
                            postData.content}
                        onChange={handleInputChange}
                        name={'content'}
                        className={'h-40 w-[100%] text-2xl outline-none'} 
                        placeholder={'What do you want to talk about?'}/>
                        {showTags && (
                            <ul className={`bg-white z-20 absolute ${searchResults?.length === 0 ? 'hidden' : null} top-[22%] rounded-md px-2 py-1 h-[200px] overflow-auto shadow-lg border border-gray-300`}>
                                {searchResults.map((user) => (
                                    <div key={user._id} onClick={() => selectUser(user)} className={`py-1 px-2 text-lg cursor-pointer items-center flex gap-2 hover:bg-gray-300 duration-200 w-[600px]`}>
                                        <img src={`${authService}` + user.profile_picture} className='rounded-full w-10 h-10'/>
                                        <div>
                                            <p className='text-lg font-semibold'>{user.name}</p>
                                            <span className='text-gray-600'>{user.headLine}</span>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        )}
                        {showHashTags && (
                            <ul className={`bg-white z-20 absolute ${hashTagResults?.length === 0 ? 'hidden' : null} top-[22%] rounded-md px-2 py-1 h-[200px] overflow-auto shadow-lg border border-gray-300`}>
                                {hashTagResults.map((tag,index) => (
                                    <div key={index} onClick={() => selectHashtag(tag)} className={`py-1 px-2 text-lg cursor-pointer items-center flex gap-2 hover:bg-gray-300 duration-200 w-[600px]`}>
                                        {/* <img src={`${authService}` + user.profile_picture} className='rounded-full w-10 h-10'/>
                                        <div>
                                            <p className='text-lg font-semibold'>{user.name}</p>
                                            <span className='text-gray-600'>{user.headLine}</span>
                                        </div> */}
                                        <span>{tag}</span>
                                    </div>
                                ))}
                            </ul>
                        )}
                        <div className="content-preview taggd-user text-blue-700 font-semibold" dangerouslySetInnerHTML={{ __html: postData.mentions.map((mention) => {return '@' +mention.name}) + 
                        "   " + postData.tags.map((tag) => {return tag})}}></div>
            </div>

            <div className='flex gap-2'>
                <div className='hover:bg-gray-100 p-1 rounded-full duration-200'>
                    <FaceSmileIcon className='w-8 h-8 text-gray-500 cursor-pointer' onClick={() => setShowPicker(!showPicker)}/>
                </div>
                <div className='hover:bg-gray-100 p-1 rounded-full duration-200'>
                    <label htmlFor="postImage"><PhotoIcon className={`w-8 h-8 cursor-pointer ${postData.image ? 'text-blue-600':'text-gray-500 '}`}/></label>
                    <input type='file' name='image' onChange={handleChange} className='hidden' id='postImage'/>
                </div>
            </div>
            <hr className='border border-gray-200 mt-2'></hr>
            <div className='mt-2 flex justify-end gap-2'>
                <Button text={'Reset'} onClick={() => setPostData({
                    tags: [], mentions: [], content: '', image:null
                })} className={'px-4 bg-gray-200 border-2 text-black border-gray-600'} rounded={'rounded-full'}/>
                <Button loading={loading} text={'Post'} disabled={disablePostButton} className={'text-white px-4 bg-[#004182] hover:bg-blue-950 duration-200'} rounded={'rounded-full'} onClick={handleSubmit}/>
            </div>
            {showPicker && (
                <div className='absolute top-[20%]'>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
            {
                notification && <Notification type={notification.type} message={notification.message} />
            }
        </div>
    </div>
)
}

