import { Route, Routes } from "react-router-dom";
import { Signup } from "./pages/auth/Signup";
import { NewPassword } from "./pages/auth/NewPassword";
import { VerifyCode } from "./pages/auth/VerifyCode";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Login } from "./pages/auth/login";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/user/Home";
import { Post } from "./components/App/Post";
import { PostModal } from "./components/modals/PostModal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/user/sign_in" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
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
