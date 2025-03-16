import { FaceSmileIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AppSelector } from '../../selectors/AppSelector'
import { Textarea } from '../UI/Textarea';
import { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Button } from '../UI/Button';
const authService = import.meta.env.VITE_USER_SERVICE;

export const AddPost = ({setAddPost}) => {
    const {userData} = AppSelector()
    const [showPicker, setShowPicker] = useState(false);
    const [text, setText] = useState("");

    const [postData,setPostData] = useState({
        content:'',
        tags:[],
        mentions:[],
        image:null,
        imagePreview:null
    })

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
  return (
    <div className="z-20 fixed inset-0 flex items-center bg-black/50 text-gray-700 justify-center backdrop-blur-xs">
        <div className="bg-white w-[90%] lg:w-[50%] px-8 py-6 rounded-lg shadow-xl">
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img src={`${authService}` + userData.profile_picture} className="rounded-full w-12 h-12"/>
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

            <div className='mt-6'>
                <Textarea value={postData.content}
                        onChange={handleChange}
                        name={'content'}
                        className={'h-40 w-[100%] text-2xl outline-none'} 
                        placeholder={'What do you want to talk about?'}/>
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
                <Button text={'Post'} className={'text-white px-4 bg-[#004182] hover:bg-blue-950 duration-200'} rounded={'rounded-full'}/>
            </div>
            {showPicker && (
                <div className='absolute top-[20%]'>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    </div>
)
}

