import React, { useEffect, useRef } from 'react'
import { Input } from '../components/UI/Input'
import { Conversation } from '../components/App/Conversation'
import defaultImage from '../../public/images/profilDefault.png'
import { Button } from '../components/UI/Button'
import messageBg from '../../public/images/bgMessage.png'
import { ChatBubbleOvalLeftEllipsisIcon, CheckIcon } from '@heroicons/react/24/outline'
import { IncomingMessage } from '../components/App/IncomingMessage'
import { OutgoingMessage } from '../components/App/OutgoingMessage'

export const Messaging = () => {
  return (
    <div className="px-3 relative top-16">
        <div className="bg-white rounded-xl shadow-md px-10 py-5 lg:flex">
            <div className='lg:w-[30%] lg:border-r border-r-gray-500 lg:pr-10'>
                <h1 className='text-2xl font-semibold'>Messaging</h1>
                <div className='mt-5'>
                    <Input type={'text'} placeholder={'Search people...'} className={'w-[100%] border-2 outline-none border-gray-400 rounded-sm px-3 py-2'}/>
                </div>

                <div className='mt-6 flex flex-nowrap lg:flex-col gap-3 lg:h-[70vh] overflow-auto'>
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                </div>
            </div>
            <div className='w-[75%] pl-[2%]'>
                <div className='lg:fixed w-[140%] lg:w-[65%]'>
                    {/* <div className='flex gap-3 items-center'>
                        <img src={defaultImage} className='rounded-full w-12 h-12'/>
                        <div>
                            <p className='text-xl font-semibold cursor-pointer hover:text-blue-800 duration-200'>Soufian boukir</p>
                            <span className='text-gray-600'>Javascript engineer</span>
                        </div>
                    </div>
                    <hr className='text-gray-200 border mt-2 w-4/4'></hr>
                    <div className='relative lg:mt-2 w-[100%] h-[70vh] overflow-auto' style={{backgroundSize:"cover",backgroundImage: `url(${messageBg})`}}>
                        <div className='px-3 py-2'>
                            <div className="w-full flex flex-col gap-2 lg:mb-0 mb-20">
                                <IncomingMessage />
                                <IncomingMessage />
                                <OutgoingMessage />
                                <OutgoingMessage />
                                <IncomingMessage />
                                <OutgoingMessage />
                            </div>
                            <AlwaysScrollToBottom />
                        </div>
                        <div className='fixed bottom-14 lg:bottom-10 mt-2 w-[100%] flex gap-2 items-center'>
                            <Input type={'text'} placeholder={'Type somthing....'} className={'w-[60%] py-3 px-5 border border-gray-400 rounded-3xl outline-none'}/>
                            <Button text={'Send'} className={'text-white bg-blue-500'}/>
                        </div>
                    </div> */}
                    <div>
                        <div className='flex mt-52'>
                            <div className='mx-auto flex justify-center gap-2 flex-col'>
                                <ChatBubbleOvalLeftEllipsisIcon className='w-24 h-24 text-black mx-auto'/>
                                <h1 className='text-4xl font-semibold'>Start new Conversation</h1>
                                <span className='text-lg text-gray-700 text-center'>Click on any conversation to show messages</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
    return <div ref={elementRef} />;
  };