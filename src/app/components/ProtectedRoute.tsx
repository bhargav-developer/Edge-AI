import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import axios from "axios";

export function ProtectedRoute() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/me", { withCredentials: true })
      .then(() => setChecking(false))
      .catch(() => navigate("/", { replace: true }));
  }, []);

  if (checking) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
    </div>
  );

  return <Outlet />;
}