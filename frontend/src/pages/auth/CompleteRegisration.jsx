import React, { useState } from 'react'
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import appName from '../../../public/appLogo.png'
import { Button } from '../../components/UI/Button';

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
export const CompleteRegisration = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
  return (
    <div>
        <div className="w-[40%] py-4 px-8 mx-auto mt-10">
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
                        {/* <p>Content for {steps[activeStep]}</p> */}
                        {
                            activeStep === 0 && <div className='flex justify-center'>
                                <h1 className='text-2xl font-semibold'>Why you wanna use Opporunet</h1>
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
