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

// import { Post } from "./components/App/Post";
// import { PostModal } from "./components/modals/PostModal";

import { CompleteRegisration } from "./pages/auth/CompleteRegisration";
import { IsNewUser } from "./protectedRoutes/CompleteReg";
import { PersisReload } from "./protectedRoutes/PersisReload";
import { NotFound } from "./pages/error/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/user/sign_up" element={<Signup />} />
        <Route path="/user/sign_in" element={<Login />} />
        <Route path="/user/new_password/:token" element={<NewPassword />} />
        <Route path="/user/forgot_password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />

        {/* <Route path="/" element={<Layout />}>
          <Route path="/condidate/home" element={<Home />} /> */}
        <Route element={<IsNewUser />}>
          <Route
            path="/user/completeRegistration"
            element={<CompleteRegisration />}
          />
        </Route>

        <Route element={<PersisReload />}>
          <Route element={<Layout />}>
            <Route path="/feed" element={<Home />} />
            <Route path="/user/profil" element={<Profil />} />
            <Route path="/user/detail/skills" element={<SkillsDetail />} />
            <Route
              path="/user/detail/interests"
              element={<InterestsDetail />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
