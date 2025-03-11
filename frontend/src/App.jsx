import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/auth/Signup"
import { NewPassword } from "./pages/auth/NewPassword"
import { VerifyCode } from "./pages/auth/VerifyCode"
import { ForgotPassword } from "./pages/auth/ForgotPassword"
import { Login } from "./pages/auth/Login"
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/user/sign_up" element={<Signup />}/>
        <Route path="/user/sign_in" element={<Login />}/>
        <Route path="/user/new_password/:token" element={<NewPassword />} />
        <Route path="/user/forgot_password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
