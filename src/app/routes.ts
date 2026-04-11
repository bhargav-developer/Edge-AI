import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Dashboard } from "./components/Dashboard";
import { Profile } from "./components/Profile";
import { VerifyOtp } from "./components/Verify-Otp";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Login },
      { path: "signup", Component: SignUp },
      { path: "verify-otp", Component: VerifyOtp },

      // ✅ Protected
      {
        Component: ProtectedRoute,
        children: [
          { path: "dashboard", Component: Dashboard },
          { path: "profile", Component: Profile },
        ],
      },
    ],
  },
]);