import React, { useState } from 'react'
import appName from '../../../public/appLogo.png'
import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'
import { useLocation, useParams } from 'react-router-dom'
import { resetPassword } from '../../services/auth'
import { ERROR_MESSAGES } from '../../constants/Errors'
import { Notification } from '../../components/UI/Notification'

export const NewPassword = () => {
    const [loading,setLoading] = useState(false);
    const [notification,setNotification] = useState(null)
    const { token } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    const [formData,setFormData] = useState({
        token : token,
        email : email,
        password : '',
        retype_password : '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setNotification(null)
        if(formData.password !== formData.retype_password){
            return
        }
        try{
            setLoading(true);
            const response = await resetPassword(formData);
            setLoading(false);

            switch(response.status){
                case 200:
                    setNotification({type:"success",message:response.data.message})
                    break;
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
    <div className="md:w-[35%] w-[80%] mx-auto mt-40">
      <div className="flex justify-center">
        <img src={appName} className="w-52" />
      </div>
      <div className="bg-gray-100 rounded-md px-10 py-5 text-center mt-5">
        <h1 className="text-xl font-semibold">Set a new Password</h1>
        <p className="text-gray-500 font-semibold text-sm mt-2">
          Your new password must be different from your previus used passwords
          to avoid forgotten
        </p>

            <form className='mt-2 flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <Label text={'Password'} className={'font-semibold text-gray-500 flex justify-start'}/>
                    <Input type={'password'}
                        name={'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={'*********'}
                        className={'px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300'}
                        />
                </div>
                <div className='flex flex-col gap-1'>
                    <Label text={'Retype password'} className={'font-semibold text-gray-500 flex justify-start'}/>
                    <Input type={'password'}
                        name={'retype_password'}
                        value={formData.retype_password}
                        onChange={handleChange}
                        placeholder={'*********'}
                        className={'px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300'}
                        />
                </div>
                <div>
                    <Button type={'submit'} text={'Reset password'} className={'bg-blue-500 text-white w-[100%] hover:bg-blue-600'}/>
                </div>
            </form>
        </div>
        {
            notification && <Notification type={notification.type} message={notification.message} />
        }
    </div>
  );
};
