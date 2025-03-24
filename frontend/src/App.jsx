import { Route, Routes } from "react-router-dom";
import { Signup } from "./pages/auth/Signup";
import { NewPassword } from "./pages/auth/NewPassword";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Login } from "./pages/auth/Login";
import { Layout } from "./layouts/Layout";
import { Home } from "./shared/Home";
import { Profil } from "./shared/Profil";

// import { Post } from "./components/App/Post";
// import { PostModal } from "./components/modals/PostModal";

import { CompleteRegisration } from "./pages/auth/CompleteRegisration";
import { IsNewUser } from "./protectedRoutes/CompleteReg";
import { PersisReload } from "./protectedRoutes/PersisReload";
import { NotFound } from "./pages/error/NotFound";
import React from "react";
import { PostId } from "./shared/PostId";
import { Notifications } from "./shared/Notifications";
import { SavedPosts } from "./shared/SavedPosts";
import { Jobs } from "./pages/user/Jobs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/user/sign_up" element={<Signup />} />
        <Route path="/user/sign_in" element={<Login />} />
        <Route path="/user/new_password/:token" element={<NewPassword />} />
        <Route path="/user/forgot_password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<IsNewUser />}>
          <Route
            path="/user/completeRegistration"
            element={<CompleteRegisration />}
          />
        </Route>

        <Route element={<PersisReload />}>
          <Route element={<Layout />}>
            <Route path="/feed" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/user/profile/:id" element={<Profil />} />
            <Route path="/post/:postId" element={<PostId />} />
            <Route path="/saved" element={<SavedPosts />} />
            <Route path="/candidate/jobs" element={<Jobs />} /> 
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
