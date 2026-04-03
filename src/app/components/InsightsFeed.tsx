import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Newspaper,
  Sparkles,
  AlertCircle,
} from "lucide-react";

interface Insight {
  id: string;
  type: "ai" | "news" | "alert";
  title: string;
  description: string;
  time: string;
  impact?: "positive" | "negative" | "neutral";
}

export function InsightsFeed() {
  const insights: Insight[] = [
    {
      id: "1",
      type: "ai",
      title: "Strong Buy Signal Detected",
      description: "Lakers showing 94% win probability for next 3 games",
      time: "2m ago",
      impact: "positive",
    },
    {
      id: "2",
      type: "news",
      title: "LeBron Returns to Training",
      description: "Expected to play in tonight's game vs Warriors",
      time: "15m ago",
      impact: "positive",
    },
    {
      id: "3",
      type: "alert",
      title: "Volatility Alert",
      description: "GSW stock experiencing high trading volume",
      time: "1h ago",
      impact: "neutral",
    },
    {
      id: "4",
      type: "ai",
      title: "Predicted Price Drop",
      description: "Heat likely to underperform based on injury reports",
      time: "2h ago",
      impact: "negative",
    },
    {
      id: "5",
      type: "news",
      title: "Record Breaking Performance",
      description: "Celtics secure 10-game winning streak",
      time: "3h ago",
      impact: "positive",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "ai":
        return <Sparkles className="h-4 w-4" />;
      case "news":
        return <Newspaper className="h-4 w-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "ai":
        return "text-cyan-400";
      case "news":
        return "text-blue-400";
      case "alert":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const getImpactIcon = (impact?: string) => {
    if (!impact || impact === "neutral") return null;
    return impact === "positive" ? (
      <TrendingUp className="h-3 w-3 text-emerald-400" />
    ) : (
      <TrendingDown className="h-3 w-3 text-red-400" />
    );
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Insights Feed</h2>
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 ${getIconColor(
                  insight.type
                )} bg-gray-900 p-2 rounded-lg`}
              >
                {getIcon(insight.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-medium text-white text-sm group-hover:text-emerald-400 transition-colors">
                    {insight.title}
                  </h4>
                  {getImpactIcon(insight.impact)}
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {insight.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 uppercase">
                    {insight.time}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      insight.type === "ai"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : insight.type === "news"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {insight.type}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
