import { Link } from "react-router-dom";
import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import { Button } from "../../components/UI/Button";
import React, { useState } from "react";
import { signUp } from "../../services/auth";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { VerifyCode } from "./VerifyCode";

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(localStorage.getItem("isSent") || "");
  const [terms, setTerms] = useState(false);
  const [readTerms, setRedTerms] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.retypePassword) {
      setError({ type: "password", message: "Passwords Mismatch" });
      return;
    }
    if (!terms || !readTerms) {
      setError({
        type: "termsNotChecked",
        message: "Please accept our terms and privacy",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await signUp(formData);

      setLoading(false);
      switch (response.status) {
        case 200:
          // localStorage.setItem('token',response.data.token)
          // dispatch({type:"UPDATE_USERDATA",payload:response.data.userData})
          // break;
          setSent("true");
          localStorage.setItem("isSent", "true");
          localStorage.setItem("email", formData.email);
          break;
      }
    } catch (err) {
      setLoading(false);
      switch (err.response.status) {
        case 401:
          setError({ type: "fromServer", message: err.response.data.message });
          break;
        case 500:
          setError({
            type: "fromServer",
            message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
          });
          break;
      }
    }
  };
  return (
    <div>
      {sent !== true ? (
        <div className="flex justify-between fade-in">
          <div className="w-[60%] h-screen md:block hidden relative">
            <img
              src="/background.png"
              alt="OpportuNet Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 px-32 py-20 text-white bg-opacity-40 mt-16">
              <div className="flex items-center min-h-[200px] gap-4">
                <img src="/lightingwith.png" className="w-[20%]" />
                <div>
                  <h1 className="text-6xl font-bold 2xl:text-7xl">Join now</h1>
                  <h1 className="text-6xl font-bold 2xl:text-7xl mt-2">
                    OpportuNet!
                  </h1>
                </div>
                <div className="md:w-[40%] w-[100%] bg-gray-100 h-[100vh] pt-20">
                  <div className="mt-6 w-[70%] mx-auto">
                    <h1 className="text-4xl font-semibold">Join us!</h1>
                    <p className="text-gray-500 font-semibold mt-2">
                      Already have an account?{" "}
                      <Link
                        className="underline text-black"
                        to={"/user/sign_in"}
                      >
                        Sign in here
                      </Link>
                      <br></br>
                      Or join Us by completing this form
                    </p>
                    <form
                      className="mt-10 flex flex-col gap-3"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col gap-1">
                        <Label
                          text={"Name"}
                          className={"font-semibold text-gray-500"}
                        />
                        <Input
                          type={"text"}
                          name={"name"}
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={"Ex: jhone.doe"}
                          className={
                            "px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300"
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
                          name={"email"}
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={"Ex: your.mail@gmail.com"}
                          className={
                            "px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300"
                          }
                        />
                        {error && error.type === "fromServer" && (
                          <span className="text-red-500 text-sm font-semibold">
                            {error.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label
                          text={"Password"}
                          className={"font-semibold text-gray-500"}
                        />
                        <Input
                          type={"password"}
                          name={"password"}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder={"*********"}
                          className={
                            "px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300"
                          }
                        />
                        {error && error.type === "password" && (
                          <span className="text-red-500 text-sm font-semibold">
                            {error.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label
                          text={"Retype password"}
                          className={"font-semibold text-gray-500"}
                        />
                        <Input
                          type={"password"}
                          name={"retypePassword"}
                          value={formData.retypePassword}
                          onChange={handleChange}
                          placeholder={"*********"}
                          className={
                            "px-3 py-1 rounded-sm border-2 outline-none border-md border-gray-300"
                          }
                        />
                        {error && error.type === "password" && (
                          <span className="text-red-500 text-sm font-semibold">
                            {error.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <div>
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            id="agree"
                            value={terms}
                            onChange={() => setTerms(!terms)}
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
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            id="read"
                            onChange={() => setRedTerms(!readTerms)}
                          />
                          <label
                            htmlFor="read"
                            className="pl-1 text-sm text-gray-600 cursor-pointer"
                          >
                            {" "}
                            I have read and accept the Privacy Policy{" "}
                          </label>
                        </div>
                        <div>
                          {error && error.type === "termsNotChecked" && (
                            <span className="text-red-500 text-sm font-semibold">
                              {error.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <Button
                          type={"submit"}
                          loading={loading}
                          text={"Join now"}
                          className={
                            "bg-blue-500 text-white w-[100%] hover:bg-blue-600"
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {sent === "true" && <VerifyCode setClose={setSent} />}
    </div>
  );
};
