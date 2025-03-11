import { Link } from 'react-router-dom'
import { Input } from '../../components/UI/Input'
import { Label } from '../../components/UI/Label'
import { Button } from '../../components/UI/Button'
// import {bg} from '../../../public/Background.png'
import React from 'react'

export const Login = () => {

  return (
    <div>
        <div className='flex justify-between'>
            
        <div className="w-[60%] h-screen md:block hidden relative">
            <img src="/background.png" alt="OpportuNet Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex px-32 flex-col py-20 text-white  bg-opacity-40">
                <div>
                    <img src='/lightingwith.png' className='w-[25%] ' />
                </div>
                <h1 className="text-6xl font-bold 2xl:text-7xl mt-10">Welcome</h1>
                <h1 className="text-6xl font-bold 2xl:text-7xl mt-6">OpportuNet!</h1>
                <div className="mt-10 w-[70%]">
                <p className="text-lg font-medium 2xl:text-2xl">
                    OpportuNet connects professionals, helping them grow and find new opportunities. Build your network, showcase your skills, and advance your career                    </p>
                </div>
            </div>
        </div>


            <div className='md:w-[40%] w-[100%] bg-gray-100 h-[100vh] pt-20'>
                <div className='mt-6 w-[70%] mx-auto'>
                    <h1 className='text-4xl font-semibold'>Login</h1>
                    <p className='text-gray-500 font-semibold mt-2'>You d'ont have an account? <Link className='underline text-black' to={'/user/sign_up'}>Create account</Link><br></br>
                    it's FREE! Takes less than a minute.
                    </p>
                    <div className='mt-8 flex flex-col gap-3'>
                            
                            <div className='flex flex-col gap-1'>
                                <Label text={'Email'} className={'font-semibold text-gray-500'}/>
                                <Input type={'email'}
                                    placeholder={'Ex: your.mail@gmail.com'}
                                    className={'px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300'}
                                    />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label text={'Password'} className={'font-semibold text-gray-500'}/>
                                <Input type={'password'}
                                    placeholder={'*********'}
                                    className={'px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300'}
                                    />
                            </div>
                            
                            
                            <div className='mt-5'>
                                <Button type={'submit'} text={'Join now'} className={'bg-blue-500 text-white w-[100%] hover:bg-blue-600'}/>
                            </div>
                            <p className='text-gray-500 font-semibold mt-2 text-center'>forget password <Link className='underline text-black' to={'/user/forgot_password'}>Click here</Link><br></br>
                            </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}