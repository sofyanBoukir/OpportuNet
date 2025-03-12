import React, { useState } from 'react'
import appName from '../../../public/appLogo.png'
import { Button } from '../../components/UI/Button'
import { MuiOtpInput } from 'mui-one-time-password-input';
import { ERROR_MESSAGES } from '../../constants/Errors';
import { checkVcode } from '../../services/auth';
import { Notification } from '../../components/UI/Notification';
export const VerifyCode = ({setClose}) => {
    const [vCode, setVcode] = useState('')
    const email = localStorage.getItem('email')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false);
    const [notification,setNotification] = useState(null);

    const handleChange = (newValue) => {
        setVcode(newValue)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setNotification(null)
        if(vCode === ''){
            return;
        }
        try{
            setLoading(true)
            const response = await checkVcode(email,vCode)
            setLoading(false)
            if(response.status === 200){
                alert('logged in successfully');
                return;
            }


        }catch(err){
            setLoading(false)
            switch(err.response.status){
                case 401:
                    setNotification({type:"error",message:err.response.data.message});
                    break
                case 500:
                    setNotification({type:"error",message:ERROR_MESSAGES.SOMETHING_WENT_WRONG})
                    break
            }
        }
    }
  return (
    <div className='md:w-[35%] w-[80%] mx-auto mt-40 fade-in'>
        <div className='flex justify-center'>
            <img src={appName} className='w-52'/>
        </div>
        <div className='bg-gray-100 rounded-md px-10 py-5 text-center mt-5'>
            <h1 className='text-xl font-semibold'>Verify code</h1>
            <p className='text-gray-500 font-semibold text-sm mt-2'>We've sent a verification code to <span className='text-black'>{email}</span>. Please enter it below to complete your signup!</p>

            <form className='mt-2 flex flex-col gap-4' onSubmit={handleSubmit}>
                <MuiOtpInput value={vCode} onChange={handleChange} length={6}/>
                <div className='flex flex-col gap-2'>
                    <Button loading={loading} type={'submit'} text={'Join'} className={'bg-blue-500 text-white w-[100%] hover:bg-blue-600'}/>
                    <Button type={'button'} text={'Back'} className={'bg-white w-[100%] text-gray-500 border border-gray-500 hover:bg-gray-100'}
                    onClick={() => {
                        localStorage.setItem('isSent',''),
                        localStorage.setItem('emailNotVerified',''),
                        localStorage.setItem('email',''),
                        setClose('')
                    }}/>
                </div>
                {
                    notification && <Notification type={notification.type} message={notification.message} />
                }
            </form>
        </div>
    </div>
  )
}
