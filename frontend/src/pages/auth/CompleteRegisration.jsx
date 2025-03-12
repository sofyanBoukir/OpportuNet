import React, { useEffect, useState } from 'react'
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import appName from '../../../public/appLogo.png'
import { Button } from '../../components/UI/Button';
import { BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';
import { getInterests } from '../../services/interest';
import { ERROR_MESSAGES } from '../../constants/Errors';
import { Input } from '../../components/UI/Input';
import { Label } from '../../components/UI/Label';

const steps = ["", "", "", ""];
export const CompleteRegisration = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [interests,setInterests] = useState([]);
    const [error,setError] = useState(false);


    const [formData,setFormData] = useState({
        role : '',
        interests : [],
        headLine : '',
        companyName : ''
    })

    const getInterests_FUNCTION = async () =>{
        try{
            const response = await getInterests();
            console.log(response);
            
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
    useEffect(() =>{
        getInterests_FUNCTION()
    },[])

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
  return (
    <div>
        <div className="w-[90%] py-4 px-8 mx-auto mt-10 md:w-[60%] lg:w-[50%]">
            <img src={appName} className='w-52 mx-auto'/>
            
            <Box sx={{ width: "100%", padding: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel
                sx={{
                    "& .MuiStepConnector-line": {
                        borderColor: "gray.400", // Change the line color to blue
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
                                    <span className='text-gray-600'>This question helps us tailor the platform to your needs. Are you here to find a job, or hire top talent?</span>

                                    <div className='flex mt-2 gap-2 justify-center'>
                                        <div className='border-2 px-3 py-1 w-[40%] text-start cursor-pointer hover:bg-gray-100 duration-200 border-black rounded-sm'>
                                            <UserIcon className='w-12 h-12' strokeWidth={0.7}/>
                                            <p className='text-ld font-semibold'>Candidate</p>
                                            <span>Looking for job,internship ... and showcasing your skills.</span>
                                        </div>
                                        <div className='border-2 px-3 py-1 w-[40%] text-start cursor-pointer hover:bg-gray-100 duration-200 border-black rounded-sm'>
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
                                    <span className='text-gray-600'>Choose topics that matter to you the most. Your feed will be customized based on your selections. At least 5 interests</span>

                                    <div className='flex mt-2 flex-wrap gap-2'>
                                        {
                                            interests && interests.length?
                                                interests.map((interest) =>{
                                                    return <div className='px-3 py-1 rounded-sm border border-gray-400 cursor-pointer hover:bg-gray-100 duration-200'>
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
                                    <span className='text-gray-600'>Tell us about your background so we can personalize your experience.</span>

                                    <div className='flex mt-2 flex-col gap-4'>
                                        <div className='flex flex-col'>
                                            <Label text={'Postion'} className={'text-start text-gray-600'}/>
                                            <Input type={'text'} placeholder={'Ex: Software developer'} 
                                            className={'py-2 px-3 border-2 border-gray-400 rounded-sm'}/>
                                        </div>

                                        <div className='flex flex-col'>
                                            <Label text={'Company name'} className={'text-start text-gray-600'}/>
                                            <Input type={'text'} placeholder={'Ex: IAM'} 
                                            className={'py-2 px-3 border-2 border-gray-400 rounded-sm'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                {/* <Button disabled={activeStep === 0} onClick={handleBack}>
                                Back
                                </Button>
                                <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={activeStep === steps.length - 1}
                                >
                                {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                </Button> */}
                                <div className='w-[100%] flex justify-end gap-2'>
                                    <Button text={'Back'}
                                    disabled={activeStep === 0} onClick={handleBack}
                                    className={'bg-white py-2 text-gray-500 border border-gray-500 hover:bg-gray-100'} />

                                    <Button text={'Next'}
                                    onClick={handleNext}
                                    disabled={activeStep === steps.length - 1} 
                                    className={'bg-blue-600 py-2 text-white hover:bg-blue-800'} />
                                </div>
                        </Box>
                    </div>
                </Box>
            </Box>
        </div>
    </div>
  )
}
