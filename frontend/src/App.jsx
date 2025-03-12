<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/auth/Signup"
import { NewPassword } from "./pages/auth/NewPassword"
import { VerifyCode } from "./pages/auth/VerifyCode"
import { ForgotPassword } from "./pages/auth/ForgotPassword"
import { Login } from "./pages/auth/Login"
=======
import { Route, Routes } from "react-router-dom";
import { Signup } from "./pages/auth/Signup";
import { NewPassword } from "./pages/auth/NewPassword";
import { VerifyCode } from "./pages/auth/VerifyCode";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Login } from "./pages/auth/login";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/user/Home";

>>>>>>> c315512d29e4584a9c8945993c408e84ae896997
function App() {
  return (
    <>
      <Routes>
<<<<<<< HEAD
        <Route path="/user/sign_up" element={<Signup />}/>
        <Route path="/user/sign_in" element={<Login />}/>
=======
        <Route path="/user/sign_in" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
>>>>>>> c315512d29e4584a9c8945993c408e84ae896997
        <Route path="/user/new_password/:token" element={<NewPassword />} />
        <Route path="/user/forgot_password" element={<ForgotPassword />} />

        <Route path="/" element={<Layout />}>
          <Route path="/recruteur/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
