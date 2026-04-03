import { motion } from "motion/react";
import { Sparkles, TrendingUp, Target } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function AIRecommendation() {
  const recommendation = {
    stock: "Celtics (BOS)",
    confidence: 87,
    reason: "Strong recent performance + favorable upcoming matchups",
    price: 389.7,
    target: 425.0,
    potential: "+9.1%",
  };

  const handleTradeNow = () => {
    toast.success("AI Trade Initiated", {
      description: `Following AI recommendation for ${recommendation.stock}`,
    });
  };

  return (
    <div className="h-full bg-gradient-to-br from-emerald-950 via-gray-900 to-cyan-950 rounded-2xl border border-emerald-500/30 p-6 relative overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-white">AI Top Pick</h3>
        </div>

        {/* Stock Name */}
        <div className="mb-4">
          <h4 className="text-2xl font-bold text-white mb-1">
            {recommendation.stock}
          </h4>
          <p className="text-sm text-gray-400">{recommendation.reason}</p>
        </div>

        {/* Confidence Level */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Confidence Level</span>
            <span className="text-sm font-bold text-emerald-400">
              {recommendation.confidence}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${recommendation.confidence}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
            />
          </div>
        </div>

        {/* Price Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="text-xs text-gray-400 mb-1">Current</div>
            <div className="text-lg font-bold text-white">
              ${recommendation.price}
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
              <Target className="h-3 w-3" />
              Target
            </div>
            <div className="text-lg font-bold text-emerald-400">
              ${recommendation.target}
            </div>
          </div>
        </div>

        {/* Potential Gain */}
        <div className="flex items-center justify-between mb-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
          <span className="text-sm text-gray-300">Potential Gain</span>
          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <TrendingUp className="h-4 w-4" />
            <span>{recommendation.potential}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleTradeNow}
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold"
        >
          Trade Now
        </Button>
      </div>
    </div>
  );
}