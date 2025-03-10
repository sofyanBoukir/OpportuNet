import React from 'react'
import appName from '../../../public/appLogo.png'
import { Button } from '../../components/UI/Button'
import { MuiOtpInput } from 'mui-one-time-password-input';
export const VerifyCode = () => {
    const [otp, setOtp] = React.useState('')

    const handleChange = (newValue) => {
        setOtp(newValue)
    }
  return (
    <div className='md:w-[35%] w-[80%] mx-auto mt-40'>
        <div className='flex justify-center'>
            <img src={appName} className='w-52'/>
        </div>
        <div className='bg-gray-100 rounded-md px-10 py-5 text-center mt-5'>
            <h1 className='text-xl font-semibold'>Verify code</h1>
            <p className='text-gray-500 font-semibold text-sm mt-2'>We've sent a verification code to <span className='text-black'>soufiane@gmail.com</span>. Please enter it below to complete your signup!</p>

            <div className='mt-2 flex flex-col gap-4'>
                <MuiOtpInput value={otp} onChange={handleChange} length={6}/>
                <div>
                    <Button type={'submit'} text={'Join'} className={'bg-blue-500 text-white w-[100%] hover:bg-blue-600'}/>
                </div>
            </div>
        </div>
    </div>
  )
}
