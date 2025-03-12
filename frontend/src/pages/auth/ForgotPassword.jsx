import React, { useState } from 'react'
import appName from '../../../public/appLogo.png'
import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'
import { useNavigate } from 'react-router-dom'
import { ERROR_MESSAGES } from '../../constants/Errors'
import { sendResetLink } from '../../services/auth'
import React from "react";
import appName from "../../../public/appLogo.png";
import { Label } from "../../components/UI/Label";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [successMssg,setSuccessMssg] = useState('');
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            setError('');
            setSuccessMssg('')
            setLoading(true)
            const response = await sendResetLink(email)
            setLoading(false)
            if(response.status === 200){
                setSuccessMssg(response.data.message)
                return;
            }

        }catch(err){
            setLoading(false)
            switch(err.response.status){
                case 401:
                    setError(err.response.data.message)
                    break
                case 500:
                    setError(ERROR_MESSAGES.SOMETHING_WENT_WRONG)
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
            <h1 className='text-xl font-semibold'>Forgot password</h1>
            <p className='text-gray-500 font-semibold text-sm mt-2'>Don't worry we will send you a reset link</p>

            <form className='mt-2 flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <Label text={'Email'} className={'font-semibold text-gray-500 flex justify-start'}/>
                    <Input type={'email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'youe.email@gmail.com'}
                        className={'px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300'}
                        />
                    {
                        error && <span className='text-red-500 text-sm font-semibold flex justify-start'>{error}</span>
                    }
                    {
                        successMssg && <span className='text-green-600 text-sm font-semibold flex justify-start'>{successMssg}</span>
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <Button type={'submit'} loading={loading} text={'Reset password'} className={'bg-blue-500 text-white w-[100%] hover:bg-blue-600'}/>
                    <Button type={'button'} text={'Back to login'} onClick={() => navigate('/user/sign_in')} className={'bg-white w-[100%] text-gray-500 border border-gray-500 hover:bg-gray-100'}/>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};
