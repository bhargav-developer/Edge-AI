import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Dashboard } from "./components/Dashboard";
import { Profile } from "./components/Profile";
import { VerifyOtp } from "./components/Verify-Otp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Login },
      { path: "signup", Component: SignUp },
      { path: "dashboard", Component: Dashboard },
      { path: "profile", Component: Profile },
         { path: "verify-otp", Component: VerifyOtp },
    ],
  },
]);
