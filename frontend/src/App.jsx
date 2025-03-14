import { Route, Routes } from "react-router-dom";
import { Signup } from "./pages/auth/Signup";
import { NewPassword } from "./pages/auth/NewPassword";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Login } from "./pages/auth/Login";
import { Layout } from "./layouts/Layout";
import { Home } from "./shared/Home";
import { Profil } from "./shared/Profil";
import { SkillsDetail } from "./shared/SkillsDetail";
import { InterestsDetail } from "./shared/InterestsDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/user/sign_up" element={<Signup />} />
        <Route path="/user/sign_in" element={<Login />} />
        <Route path="/user/new_password/:token" element={<NewPassword />} />
        <Route path="/user/forgot_password" element={<ForgotPassword />} />

        <Route path="/" element={<Layout />}>
          <Route path="/condidate/home" element={<Home />} />
          <Route path="/user/profil" element={<Profil />} />
          <Route path="/user/detail/skills" element={<SkillsDetail />} />
          <Route path="/user/detail/interests" element={<InterestsDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
