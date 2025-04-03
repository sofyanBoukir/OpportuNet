import React from 'react'
import { Button } from '../../components/UI/Button'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import AnimationError from '../../assets/AnimationError.json'
export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center flex-col items-center'>
        {/* <h1 className='text-3xl font-semibold flex mt-10'>Not found</h1> */}
        <Lottie animationData={AnimationError}  loop={true}/>
        <Button text={'Back to home page'} className={'bg-blue-500 text-white'} onClick={() => navigate('/feed')}/>
    </div>
  )
}
