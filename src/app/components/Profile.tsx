import { motion } from "motion/react";
import {
  User,
  Mail,
  Shield,
  Bell,
  Moon,
  TrendingUp,
  Activity,
  Award,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";

export function Profile() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [userInfo, setUserInfo] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    joinDate: "January 2024",
    totalInvested: "$98,500",
    totalReturn: "$27,340",
    returnPercent: "+27.8%",
    winRate: "68%",
    tradesCompleted: 234,
  });

 
// your file :contentReference[oaicite:0]{index=0}

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/me`, {
        withCredentials: true,
      });

      setUserInfo((prev) => ({
        ...prev,
        name: res.data.user.name,
        email: res.data.user.email,
      }));
    } catch (err) {
      console.error("Not authenticated");
    }
  };

  fetchUser();
}, []);

  const tradingHistory = [
    {
      id: "1",
      stock: "Lakers (LAL)",
      action: "Buy",
      shares: 25,
      price: 342.5,
      total: 8562.5,
      date: "Mar 29, 2026",
      profit: 428.13,
    },
    {
      id: "2",
      stock: "Celtics (BOS)",
      action: "Sell",
      shares: 15,
      price: 389.7,
      total: 5845.5,
      date: "Mar 28, 2026",
      profit: -124.5,
    },
    {
      id: "3",
      stock: "LeBron James (LBJ)",
      action: "Buy",
      shares: 50,
      price: 156.2,
      total: 7810.0,
      date: "Mar 27, 2026",
      profit: 225.0,
    },
    {
      id: "4",
      stock: "Warriors (GSW)",
      action: "Sell",
      shares: 20,
      price: 428.9,
      total: 8578.0,
      date: "Mar 26, 2026",
      profit: 890.23,
    },
  ];

  const holdings = [
    { stock: "Lakers (LAL)", shares: 50, avgPrice: 325.4, currentPrice: 342.5, value: 17125, profit: 855 },
    { stock: "Celtics (BOS)", shares: 30, avgPrice: 375.2, currentPrice: 389.7, value: 11691, profit: 435 },
    { stock: "LeBron James (LBJ)", shares: 100, avgPrice: 148.5, currentPrice: 156.2, value: 15620, profit: 770 },
  ];

  const handleSaveChanges = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/api/update-profile`,
        { name: userInfo.name },
        { withCredentials: true }
      );
      toast.success("Profile Updated", {
        description: "Your changes have been saved successfully",
      });
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = () => {
    toast.info("Change Password", {
      description: "A password reset link has been sent to your email",
    });
  };

  const handleEnable2FA = () => {
    toast.success("Two-Factor Authentication", {
      description: "2FA has been enabled for your account",
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 p-8 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
                {userInfo.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {userInfo.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {userInfo.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Joined {userInfo.joinDate}
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800">
                Edit Profile
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs">Total Invested</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {userInfo.totalInvested}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">Total Return</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  {userInfo.totalReturn}
                </div>
                <div className="text-xs text-emerald-400 mt-1">
                  {userInfo.returnPercent}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Award className="h-4 w-4" />
                  <span className="text-xs">Win Rate</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {userInfo.winRate}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs">Trades</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {userInfo.tradesCompleted}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="holdings" className="space-y-6">
            <TabsList className="bg-gray-900 border border-gray-800">
              <TabsTrigger value="holdings" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                Holdings
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                Trading History
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Holdings Tab */}
            <TabsContent value="holdings" className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr className="text-left text-xs text-gray-400 uppercase">
                        <th className="px-6 py-4">Stock</th>
                        <th className="px-6 py-4">Shares</th>
                        <th className="px-6 py-4">Avg Price</th>
                        <th className="px-6 py-4">Current Price</th>
                        <th className="px-6 py-4">Total Value</th>
                        <th className="px-6 py-4">Profit/Loss</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {holdings.map((holding) => (
                        <tr key={holding.stock} className="text-white hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 font-medium">{holding.stock}</td>
                          <td className="px-6 py-4">{holding.shares}</td>
                          <td className="px-6 py-4 text-gray-400">${holding.avgPrice.toFixed(2)}</td>
                          <td className="px-6 py-4">${holding.currentPrice.toFixed(2)}</td>
                          <td className="px-6 py-4 font-semibold">${holding.value.toLocaleString()}</td>
                          <td className={`px-6 py-4 font-semibold ${holding.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {holding.profit >= 0 ? '+' : ''}${holding.profit.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </TabsContent>

            {/* Trading History Tab */}
            <TabsContent value="history" className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr className="text-left text-xs text-gray-400 uppercase">
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Stock</th>
                        <th className="px-6 py-4">Action</th>
                        <th className="px-6 py-4">Shares</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Profit/Loss</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {tradingHistory.map((trade) => (
                        <tr key={trade.id} className="text-white hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 text-gray-400">{trade.date}</td>
                          <td className="px-6 py-4 font-medium">{trade.stock}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${trade.action === "Buy"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-orange-500/20 text-orange-400"
                                }`}
                            >
                              {trade.action}
                            </span>
                          </td>
                          <td className="px-6 py-4">{trade.shares}</td>
                          <td className="px-6 py-4">${trade.price.toFixed(2)}</td>
                          <td className="px-6 py-4 font-semibold">
                            ${trade.total.toLocaleString()}
                          </td>
                          <td
                            className={`px-6 py-4 font-semibold ${trade.profit >= 0 ? "text-emerald-400" : "text-red-400"
                              }`}
                          >
                            {trade.profit >= 0 ? "+" : ""}$
                            {Math.abs(trade.profit).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Account Settings */}
                <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Account Information
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-400 m-1">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="m-1 text-gray-400">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        disabled={true}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <Button
                      onClick={handleSaveChanges}
                      className="w-full bg-emerald-400 hover:bg-emerald-500 ">
                      Save Changes
                    </Button>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Bell className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">AI Alerts</div>
                        <div className="text-xs text-gray-400">
                          Get notified about AI recommendations
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">
                          Price Movements
                        </div>
                        <div className="text-xs text-gray-400">
                          Alerts for significant price changes
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">
                          News Updates
                        </div>
                        <div className="text-xs text-gray-400">
                          Sports news affecting your stocks
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Security
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <Button
                      onClick={handleChangePassword}
                      variant="outline"
                      className="w-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800"
                    >
                      Change Password
                    </Button>
                    <Button
                      onClick={handleEnable2FA}
                      variant="outline"
                      className="w-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800"
                    >
                      Enable Two-Factor Auth
                    </Button>
                  </div>
                </div>

                {/* Risk Settings */}
                <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Moon className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Trading Preferences
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-400">Risk Level</Label>
                      <select className="w-full mt-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white">
                        <option>Conservative</option>
                        <option>Moderate</option>
                        <option>Aggressive</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">
                          Auto-Trading
                        </div>
                        <div className="text-xs text-gray-400">
                          Follow AI recommendations automatically
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}