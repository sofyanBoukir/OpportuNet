import React, { useEffect, useState } from 'react'
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import appName from '../../../public/appLogo.png'
import { Button } from '../../components/UI/Button';
import { BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';
import { getInterests } from '../../services/interest';
import { ERROR_MESSAGES } from '../../constants/Errors';
import { Input } from '../../components/UI/Input';
import { Label } from '../../components/UI/Label';
import { ExtraLoading } from '../../components/App/ExtraLoading';
import { useSelector } from 'react-redux';
import { completeRegistration } from '../../services/profile';
import { Notification } from '../../components/UI/Notification';
import { useNavigate } from 'react-router-dom';

const steps = ["", "", "", ""];
export const CompleteRegisration = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [interests,setInterests] = useState([]);
    const [notification,setNotification] = useState(null);
    const [error,setError] = useState()
    const appStore = useSelector(data => data);
    const [loading,setLoading] = useState(false);
    const [extraLoading,setExtraLoading] = useState(false);
    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        role : '',
        interests : [],
        headLine : '',
        companyName : ''
    })

    const _getInterests = async () =>{
        try{
            const response = await getInterests();
            
            response.status === 200 &&
            setInterests(response.data.interests)
        }catch(err){
            switch(err.response.status){
                case 401:
                    setError({type:"fromServer",message:err.response.data.message})
                    break
                case 500:
                    setError({type:"fromServer",message:ERROR_MESSAGES.SOMETHING_WENT_WRONG})
                    break
            }
        }
    }

    const _completeRegistration = async () =>{
        setNotification(null)
        try{
            setLoading(true);
            const response = await completeRegistration(localStorage.getItem('token'),formData);

            setLoading(false);
            if(response.status === 200){
                setExtraLoading(true);
                setTimeout(() => {
                    setExtraLoading(false);
                }, 3000);
                setTimeout(() => {
                    navigate('/feed')
                }, 2050);
            }
        }catch(err){
            setLoading(false);
            switch(err.response.status){
                case 403:
                    setNotification({type:"error",message:err.response.data.message})
                    break
                case 500:
                    setNotification({type:"error",message:ERROR_MESSAGES.SOMETHING_WENT_WRONG})
                    break
            }
        }
    }
    useEffect(() =>{
        _getInterests()
    },[])

    
    const handleNext = () => {
        
        if(activeStep === 0 && formData.role === ''){
            return;
        }

        else if(activeStep === 1 && formData.interests.length < 5){
            return;
        }

        else if(formData.role === 'candidate' && activeStep === 2 && formData.headLine === ''){
            return;
        }

        else if(activeStep === 2 && formData.role === 'recuiter' && (formData.headLine === '' || formData.companyName === '')){
            return;
        }

        if(activeStep === 3){
            _completeRegistration()
            return
        }
        

        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
  return (
    <div>
        <div className="w-[90%] py-4 px-8 mx-auto mt-10 md:w-[60%] lg:w-[60%]">
            <img src={appName} className='w-52 mx-auto'/>
            
            <Box sx={{ width: "100%", padding: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel
                sx={{
                    "& .MuiStepConnector-line": {
                        borderColor: "gray.400",
                        borderWidth: 1,
                        margin: 1,
                        marginTop:1.4,
                        display:"flex",
                        alignItems:"center"
                    },
                    ".MuiStepIcon-root": {
                        fontSize: 50,
                      },
                    "& .MuiStepIcon-root": { color: "gray.400"},
                    "& .MuiStepIcon-root.Mui-active": { color: "blue" },
                    "& .MuiStepIcon-root.Mui-completed": { color: "blue" },
                  }}>
                    {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>


                <Box sx={{ mt: 4 }}>
                    <div>
                        {
                            activeStep === 0 && <div className='flex justify-center text-center'>
                                <div>
                                    <h1 className='text-3xl font-semibold text-center'>Why do you want to use our app?</h1>
                                    <br></br>
                                    <span className='text-gray-800 text-lg'>This question helps us tailor the platform to your needs. Are you here to find a job, or hire top talent?</span>

                                    <div className='flex mt-4 gap-2 justify-center'>
                                        <div onClick={() => setFormData({...formData,role:'candidate'})}
                                        className={`border-2 px-3 shadow-lg py-1 w-[50%] md:w-[30%] text-start cursor-pointer hover:bg-gray-100 duration-200 border-black rounded-sm
                                        ${formData.role === 'candidate' ? 'bg-blue-50 border-blue-700 text-blue-800' :null}`}>
                                            <UserIcon className='w-12 h-12' strokeWidth={0.7}/>
                                            <p className='text-ld font-semibold'>Candidate</p>
                                            <span>Looking for job,internship ... and showcasing your skills.</span>
                                        </div>
                                        <div onClick={() => setFormData({...formData,role:'recuiter'})} 
                                        className={`border-2 px-3 shadow-lg py-1 w-[50%] md:w-[30%] text-start cursor-pointer hover:bg-gray-100 duration-200 border-black rounded-sm
                                        ${formData.role === 'recuiter' ? 'bg-blue-50 border-blue-700 text-blue-800' :null}`}>
                                            <BriefcaseIcon className='w-12 h-12' strokeWidth={0.7}/>
                                            <p className='text-ld font-semibold'>Recruiter</p>
                                            <span> Searching for top talent, posting job openings.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            activeStep === 1 && <div className='flex justify-center text-center'>
                                <div>
                                    <h1 className='text-3xl font-semibold text-center'>Select your interests! </h1>
                                    <br></br>
                                    <span className='text-gray-800 text-lg'>Choose topics that matter to you the most. Your feed will be customized based on your selections. <br></br><span className='underline'>At least 5 interests</span></span>

                                    <div className='flex mt-4 flex-wrap justify-center gap-2'>
                                        {
                                            interests && interests.length?
                                                interests.map((interest) =>{
                                                    return <div onClick={() =>
                                                        formData.interests.includes(interest._id)
                                                          ? setFormData({
                                                              ...formData,
                                                              interests: formData.interests.filter((item) => item !== interest._id),
                                                            })
                                                          : setFormData({
                                                              ...formData,
                                                              interests: [...formData.interests, interest._id],
                                                            })
                                                      }
                                                    className={`px-4 py-2 shadow rounded-sm border cursor-pointer hover:bg-gray-100 duration-200
                                                    ${formData.interests.includes(interest._id) ? 'bg-blue-50 border-blue-700 text-blue-800' : null}
                                                    `}>
                                                        {interest.interest}
                                                    </div>
                                                })
                                            : error && <span className='text-red-500'>{error}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            activeStep === 2 && <div className='flex justify-center text-center'>
                                <div>
                                    <h1 className='text-3xl font-semibold text-center'>What describes you!</h1>
                                    <br></br>
                                    <span className='text-gray-800 text-lg'>Tell us about your background so we can personalize your experience.</span>

                                    <div className='flex mt-2 flex-col gap-4'>
                                        <div className='flex flex-col'>
                                            <Label text={'HeadLine'} className={'text-start text-lg text-gray-600'}/>
                                            <Input type={'text'} placeholder={'Ex: Software developer'} value={formData.headLine} onChange={(e) => setFormData({...formData,headLine:e.target.value})}
                                            className={'py-2 px-3 border-2 border-gray-400 rounded-sm'}/>
                                        </div>

                                        {
                                            formData.role === 'recuiter' ?
                                            <div className='flex flex-col'>
                                                <Label text={'Company name'} className={'text-start text-gray-600'}/>
                                                <Input type={'text'} placeholder={'Ex: IAM'} value={formData.companyName} onChange={(e) => setFormData({...formData,companyName:e.target.value})}
                                                className={'py-2 px-3 border-2 border-gray-400 rounded-sm'}/>
                                            </div> : null
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            activeStep === 3 && <div className='flex justify-center text-center'>
                                <div>
                                    <h1 className='text-3xl font-semibold text-center'>Congrutulations {appStore.userData.name}!</h1>
                                    <br></br>
                                    <span className='text-start text-lg text-gray-600'>Let's move forward and explore the best opportunities—whether you're looking to hire top talent or discover your next career move!</span>

                                    
                                </div>
                            </div>
                        }
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                <div className='w-[100%] flex justify-end gap-2'>
                                    <Button text={'Back'}
                                    disabled={activeStep === 0} onClick={handleBack}
                                    className={'bg-white py-2 text-gray-500 border border-gray-500 hover:bg-gray-100'} />

                                    <Button text={`${activeStep === 3 ? 'Finish' : 'Next'}`}
                                    onClick={handleNext}
                                    disabled={activeStep === steps.length} 
                                    loading={activeStep === 3 && loading}
                                    className={'bg-blue-600 py-2 text-white hover:bg-blue-800'} />
                                </div>
                        </Box>
                    </div>
                    {
                        notification && <Notification type={notification.type} message={notification.message} />
                    }
                    {
                        extraLoading && <ExtraLoading />
                    }
                </Box>
            </Box>
        </div>
    </div>
  )
}
