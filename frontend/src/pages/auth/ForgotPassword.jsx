import React from "react";
import appName from "../../../public/appLogo.png";
import { Label } from "../../components/UI/Label";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
export const ForgotPassword = () => {
  return (
    <div className="md:w-[35%] w-[80%] mx-auto mt-40">
      <div className="flex justify-center">
        <img src={appName} className="w-52" />
      </div>
      <div className="bg-gray-100 rounded-md px-10 py-5 text-center mt-5">
        <h1 className="text-xl font-semibold">Forgot password</h1>
        <p className="text-gray-500 font-semibold text-sm mt-2">
          Don't worry we will send you a reset link
        </p>

        <div className="mt-2 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label
              text={"Email"}
              className={"font-semibold text-gray-500 flex justify-start"}
            />
            <Input
              type={"email"}
              placeholder={"youe.email@gmail.com"}
              className={
                " bg-inherit px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300"
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type={"submit"}
              text={"Reset password"}
              className={"bg-blue-500 text-white w-[100%] hover:bg-blue-600"}
            />
            <Button
              type={"submit"}
              text={"Back to login"}
              className={
                "bg-white w-[100%] text-gray-500 border border-gray-500 hover:bg-gray-100"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
