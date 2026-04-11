import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";

export function Layout() {
  const location = useLocation();
  const showHeader = location.pathname !== "/" && location.pathname !== "/signup"&& location.pathname !== "/verify-otp";

  return (
    <div className="min-h-screen bg-gray-950">
      {showHeader && <Header />}
      <Outlet />
    </div>
  );
}
