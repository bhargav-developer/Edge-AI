import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { Mail, Lock } from "lucide-react";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const BASE_URL = import.meta.env.VITE_BASE_URL;


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(
        `${BASE_URL}/api/login`,
        { email, password },
        { withCredentials: true }
      );

      navigate("/dashboard");

    } catch (err: any) {
      // ✅ Not verified → resend OTP and redirect
      if (err.response?.status === 403 && err.response?.data?.tempToken) {
        alert(err.response.data.msg);
        navigate("/verify-otp", {
          state: { token: err.response.data.tempToken }
        });
        return;
      }

      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1732881111596-647e73b24f5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc3RhZGl1bSUyMGxpZ2h0cyUyMHNwb3J0c3xlbnwxfHx8fDE3NzQ4NjY1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
      <div className="absolute inset-0 bg-gray-950/90 dark:bg-gray-950/80" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-gray-900/80 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">
              Sign in to access your AI-powered trading dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-700 bg-gray-800/50 text-emerald-500 focus:ring-emerald-500/20"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold h-11"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.href = "http://localhost:3000/auth/google"}
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <i className="fa-brands fa-google mr-2"></i>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed opacity-50"
            >
              <i className="fa-brands fa-apple mr-2"></i>
              Apple
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}