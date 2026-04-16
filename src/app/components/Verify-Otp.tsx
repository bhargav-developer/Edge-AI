import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import axios from "axios";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const token = location.state?.token;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    if (!token) {
      alert("Session expired. Please register again.");
      navigate("/register");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/api/verify-otp`, { otp, token }, { withCredentials: true });
      alert("Account verified successfully!");
      navigate("/dashboard");

    } catch (err: any) {
      alert(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1665114208033-150ffe629a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10" />
      <div className="absolute inset-0 bg-gray-950/90" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Verify OTP</h1>
            <p className="text-gray-400 text-sm text-center">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Didn't receive the code?{" "}
            <Link
              to="/signup"
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Register again
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}