import { Link } from "react-router-dom";
import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import { Button } from "../../components/UI/Button";
import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button as Buttonn,
  Box,
} from "@mui/material";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

export const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[60%] pl-40 pt-20 md:block hidden">
          <div className="mt-5">
            <h1 className="text-5xl font-bold">Join</h1>
            <h1 className="text-5xl font-bold">OpportuNet!</h1>
            <div className="mt-10 w-[70%]">
              <p className="text-lg font-medium">
                Join a thriving network of professionals, expand your
                connections, and seize new career opportunities. Your next big
                move starts here!
                <br></br>
                <br></br>Step into a world of opportunities—connect, learn, and
                grow with top professionals. Build your career, showcase your
                skills, and unlock new possibilities!
              </p>
            </div>
          </div>
        </div>
        {/* <div className="w-full py-4 px-8">
            <Box sx={{ width: "100%", padding: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 4 }}>
                    <div>
                    <p>Content for {steps[activeStep]}</p>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Buttonn disabled={activeStep === 0} onClick={handleBack}>
                        Back
                        </Buttonn>
                        <Buttonn
                        variant="contained"
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1}
                        >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Buttonn>
                    </Box>
                    </div>
                </Box>
                </Box>
            </div> */}
        <div className="md:w-[40%] w-[100%] bg-gray-100 h-[100vh] pt-20">
          <div className="mt-6 w-[70%] mx-auto">
            <h1 className="text-4xl font-semibold">Join us!</h1>
            <p className="text-gray-500 font-semibold mt-2">
              Already have an account?{" "}
              <Link className="underline text-black">Sign in here</Link>
              <br></br>
              Or join Us by completing this form
            </p>
            <div className="mt-10 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <Label
                  text={"Name"}
                  className={"font-semibold text-gray-500"}
                />
                <Input
                  type={"text"}
                  placeholder={"Ex: jhone.doe"}
                  className={
                    "bg-inherit px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300"
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  text={"Email"}
                  className={"font-semibold text-gray-500"}
                />
                <Input
                  type={"email"}
                  placeholder={"Ex: your.mail@gmail.com"}
                  className={
                    "bg-inherit px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300"
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  text={"Password"}
                  className={"font-semibold text-gray-500"}
                />
                <Input
                  type={"password"}
                  placeholder={"*********"}
                  className={
                    " bg-inherit px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300"
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  text={"Retype password"}
                  className={"font-semibold text-gray-500"}
                />
                <Input
                  type={"password"}
                  placeholder={"*********"}
                  className={
                    " bg-inherit px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300"
                  }
                />
              </div>
              <div>
                <div>
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    id="agree"
                  />
                  <label
                    htmlFor="agree"
                    className="pl-1 text-sm text-gray-600 cursor-pointer"
                  >
                    I agree to the{" "}
                  </label>
                  <Link className="text-blue-400 text-sm">
                    Terms & conditions
                  </Link>
                </div>
                <div>
                  <input type="checkbox" className="cursor-pointer" id="read" />
                  <label
                    htmlFor="read"
                    className="pl-1 text-sm text-gray-600 cursor-pointer"
                  >
                    {" "}
                    I have read and accept the Privacy Policy{" "}
                  </label>
                </div>
              </div>
              <div>
                <Button
                  type={"submit"}
                  text={"Join now"}
                  className={
                    "bg-blue-500 text-white w-[100%] hover:bg-blue-600"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
