import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/UI/Input'
import { Label } from '../../components/UI/Label'
import { Button } from '../../components/UI/Button'
import React, { useState } from 'react'
import { login, signedInButNotVerified } from '../../services/auth'
import { ERROR_MESSAGES } from '../../constants/Errors'
import { useDispatch } from 'react-redux'
import { VerifyCode } from './VerifyCode'
import { ExtraLoading } from '../../components/App/ExtraLoading'

export const Login = () => {

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState();
    const [emailNotVerified,setEmailNotVerified] = useState(localStorage.getItem('emailNotVerified') || '');
    const [extraLoading,setExtraLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    
    const [formData,setFormData] = useState({
        email : '',
        password : '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // try{
            setLoading(true);
            const response = await login(formData);
            console.log(response);
            
            
            switch(response.status){
                case 200:
                    if(!response.data.isVerified){
                        const response = await signedInButNotVerified(formData.email);
                        setLoading(false);
                        response.status === 200 && (
                            setEmailNotVerified('true'),
                            localStorage.setItem('emailNotVerified','true'),
                            localStorage.setItem('email',formData.email)
                        )
                        break;
                    }
                    setLoading(false);
                    localStorage.setItem('token',response.data.token)
                    console.log(response);
                    
                    if(response.data.userData.isNewUser){
                        setExtraLoading(true)
                        setTimeout(() => {
                            setExtraLoading(false);
                        }, 3000);
                        setTimeout(() => {
                            navigate('/user/completeRegistration')
                        }, 2050);
                        break;
                    }
                    else{
                        dispatch({type:"UPDATE_USERDATA",payload:response.data.userData})
                        navigate('/feed')
                        break;
                    }
        //     }
        // }catch(err){
        //     setLoading(false)
        //     switch(err.response.status){
        //         case 401:
        //             setError(err.response.data.message)
        //             break
        //         case 500:
        //             setError(ERROR_MESSAGES.SOMETHING_WENT_WRONG)
        //             break
        //     }
        }
    }
  return (
    <div>
        {
            emailNotVerified !== 'true' ?
                <div className='flex justify-between fade-in'>
                    
                    <div className="w-[60%] h-screen md:block hidden relative">
                        <img src="/background.png" alt="OpportuNet Banner" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 px-32 py-20 text-white bg-opacity-40 mt-28">
                            <div className="flex items-center min-h-[200px] gap-4">
                                <img src="/lightingwith.png" className="w-[20%]" />
                                <div>
                                    <h1 className="text-6xl font-bold 2xl:text-7xl">Welcome to</h1>
                                    <h1 className="text-6xl font-bold 2xl:text-7xl mt-2">OpportuNet!</h1>
                                </div>
                            </div>
                            <div className="mt-10 w-[90%]">
                                <p className="text-lg font-medium 2xl:text-2xl">
                                    OpportuNet connects professionals, helping them grow and find new opportunities. Build your network, showcase your skills, and advance your career
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className='md:w-[40%] w-[100%] bg-gray-100 h-[100vh] pt-20'>
                        <div className='mt-6 w-[70%] mx-auto'>
                            <h1 className='text-4xl font-semibold'>Login</h1>
                            <p className='text-gray-500 font-semibold mt-2'>You d'ont have an account? <Link className='underline text-black' to={'/user/sign_up'}>Create account</Link><br></br>
                            it's FREE! Takes less than a minute.
                            </p>
                            <form className='mt-8 flex flex-col gap-3' onSubmit={handleSubmit}>
                                    
                                    <div className='flex flex-col gap-1'>
                                        <Label text={'Email'} className={'font-semibold text-gray-500'}/>
                                        <Input type={'email'}
                                            name={'email'}
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={'Ex: your.mail@gmail.com'}
                                            className={'px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300'}
                                            />
                                            {
                                                error && <span className='text-red-500 text-sm font-semibold'>{error}</span>
                                            }
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <Label text={'Password'} className={'font-semibold text-gray-500'}/>
                                        <Input type={'password'}
                                            name={'password'}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder={'*********'}
                                            className={'px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300'}
                                            />
                                    </div>
                                    
                                    
                                    <div className='mt-5'>
                                        <Button loading={loading} type={'submit'} text={'Sign in'} className={'bg-blue-500 text-white w-[100%] hover:bg-blue-600'}/>
                                    </div>
                                    <p className='text-gray-500 font-semibold mt-2 text-center'>forget password <Link className='underline text-black' to={'/user/forgot_password'}>Click here</Link><br></br>
                                    </p>
                            </form>
                        </div>
                    </div>
                </div>
                :null
        }
        {
            emailNotVerified === 'true' && <VerifyCode setClose={setEmailNotVerified}/>
        }
        {
            extraLoading && <ExtraLoading />
        }
    </div>
  );
};
