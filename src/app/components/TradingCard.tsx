import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Flame } from "lucide-react";
import { Button } from "./ui/button";
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

interface TradingCardProps {
  stock: Stock;
}

export function TradingCard({ stock }: TradingCardProps) {
  const isPositive = stock.change >= 0;

  const handleBuy = () => {
    toast.success(`Buy order placed for ${stock.name}`, {
      description: `${stock.symbol} @ $${stock.price}`,
    });
  };

  const handleSell = () => {
    toast.success(`Sell order placed for ${stock.name}`, {
      description: `${stock.symbol} @ $${stock.price}`,
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 overflow-hidden group cursor-pointer"
    >
      {/* Hot Badge */}
      {stock.isHot && (
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
          <Flame className="h-3 w-3" />
          <span className="text-[10px] font-bold uppercase">Hot</span>
        </div>
      )}

      {/* Stock Info */}
      <div className="mb-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-white">{stock.name}</h3>
            <span className="text-xs text-gray-400">{stock.symbol}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-white">
            ${stock.price.toFixed(2)}
          </span>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {stock.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="text-xs text-gray-400">Vol: {stock.volume}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          onClick={handleBuy}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white h-8"
        >
          Buy
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleSell}
          className="flex-1 border-gray-600 bg-gray-800/50 text-white hover:bg-gray-700 h-8"
        >
          Sell
        </Button>
      </div>

      {/* Animated Border on Hover */}
      <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/0 group-hover:border-emerald-500/50 transition-colors pointer-events-none" />
    </motion.div>
  );
}