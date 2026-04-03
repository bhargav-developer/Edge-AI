import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Download,
  Upload,
  Activity,
  MessageCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { TradingCard } from "./TradingCard";
import { AIRecommendation } from "./AIRecommendation";
import { PriceChart } from "./PriceChart";
import { InsightsFeed } from "./InsightsFeed";
import { toast } from "sonner";

interface Stock {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  isHot?: boolean;
}

export function Dashboard() {
  const [portfolioValue, setPortfolioValue] = useState(125840.5);
  const [profitLoss, setProfitLoss] = useState(8420.3);
  const [profitLossPercent, setProfitLossPercent] = useState(7.18);
  const [marketStatus, setMarketStatus] = useState<"live" | "closed">("live");
  const [timeFilter, setTimeFilter] = useState<"1H" | "24H" | "7D">("24H");

  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: "1",
      name: "Lakers",
      symbol: "LAL",
      price: 342.5,
      change: 12.8,
      changePercent: 3.89,
      volume: "2.4M",
      isHot: true,
    },
    {
      id: "2",
      name: "Warriors",
      symbol: "GSW",
      price: 428.9,
      change: -8.4,
      changePercent: -1.92,
      volume: "3.1M",
      isHot: true,
    },
    {
      id: "3",
      name: "LeBron James",
      symbol: "LBJ",
      price: 156.2,
      change: 4.5,
      changePercent: 2.97,
      volume: "1.8M",
    },
    {
      id: "4",
      name: "Celtics",
      symbol: "BOS",
      price: 389.7,
      change: 15.3,
      changePercent: 4.08,
      volume: "2.9M",
      isHot: true,
    },
    {
      id: "5",
      name: "Stephen Curry",
      symbol: "SC30",
      price: 198.4,
      change: -3.2,
      changePercent: -1.59,
      volume: "2.1M",
    },
    {
      id: "6",
      name: "Heat",
      symbol: "MIA",
      price: 267.8,
      change: 7.9,
      changePercent: 3.04,
      volume: "1.5M",
    },
  ]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const changeAmount = (Math.random() - 0.5) * 2;
          const newPrice = stock.price + changeAmount;
          const newChange = stock.change + changeAmount;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;

          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(newChange.toFixed(2)),
            changePercent: parseFloat(newChangePercent.toFixed(2)),
          };
        })
      );

      // Update portfolio value
      setPortfolioValue((prev) => prev + (Math.random() - 0.5) * 100);
      setProfitLoss((prev) => prev + (Math.random() - 0.5) * 50);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDeposit = () => {
    toast.success("Deposit Request Initiated", {
      description: "Your deposit will be processed shortly",
    });
  };

  const handleWithdraw = () => {
    toast.success("Withdrawal Request Initiated", {
      description: "Your withdrawal will be processed within 24 hours",
    });
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Top Section - Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Market Status & Portfolio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 p-6 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1648293981217-420f71485b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0cmFkaW5nJTIwY2hhcnRzJTIwZmluYW5jZXxlbnwxfHx8fDE3NzQ4NjY1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")',
                }}
              />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Wallet className="h-6 w-6 text-emerald-400" />
                  <h2 className="text-xl font-semibold text-white">
                    Portfolio Value
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                      marketStatus === "live"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    <Activity
                      className={`h-3 w-3 ${
                        marketStatus === "live" ? "animate-pulse" : ""
                      }`}
                    />
                    <span className="text-xs font-medium uppercase">
                      {marketStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-5xl font-bold text-white mb-2">
                    ${portfolioValue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    {profitLoss >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    )}
                    <span
                      className={`text-xl font-semibold ${
                        profitLoss >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {profitLoss >= 0 ? "+" : ""}$
                      {Math.abs(profitLoss).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      ({profitLossPercent >= 0 ? "+" : ""}
                      {profitLossPercent.toFixed(2)}%)
                    </span>
                    <span className="text-gray-400 text-sm">Today</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleDeposit}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Deposit
                  </Button>
                  <Button
                    onClick={handleWithdraw}
                    variant="outline"
                    className="flex-1 border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Recommendation Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4"
          >
            <AIRecommendation />
          </motion.div>
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 rounded-2xl border border-gray-800 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Market Overview</h2>
            <div className="flex gap-2">
              {(["1H", "24H", "7D"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === filter
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <PriceChart timeFilter={timeFilter} />
        </motion.div>

        {/* Trading Panel & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Trading Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-gray-900 rounded-2xl border border-gray-800 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Trending Sports Stocks
              </h2>
              <div className="text-sm text-gray-400">Live Updating</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stocks.map((stock) => (
                <TradingCard key={stock.id} stock={stock} />
              ))}
            </div>
          </motion.div>

          {/* Insights Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <InsightsFeed />
          </motion.div>
        </div>
      </div>

      {/* Floating AI Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        onClick={() => toast.info("AI Assistant", { description: "AI chat feature coming soon!" })}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg hover:shadow-emerald-500/50 transition-shadow flex items-center justify-center"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
    </div>
  );
}