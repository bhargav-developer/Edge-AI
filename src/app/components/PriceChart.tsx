import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface PriceChartProps {
  timeFilter: "1H" | "24H" | "7D";
}

export function PriceChart({ timeFilter }: PriceChartProps) {
  const [data, setData] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    // Generate mock data based on time filter
    const generateData = () => {
      let dataPoints = 0;
      let timeFormat = "";

      switch (timeFilter) {
        case "1H":
          dataPoints = 12;
          timeFormat = "min";
          break;
        case "24H":
          dataPoints = 24;
          timeFormat = "h";
          break;
        case "7D":
          dataPoints = 7;
          timeFormat = "d";
          break;
      }

      const baseValue = 125000;
      const newData = Array.from({ length: dataPoints }, (_, i) => {
        const variance = Math.sin(i * 0.5) * 5000 + Math.random() * 2000;
        return {
          time: `${i + 1}${timeFormat}`,
          value: baseValue + variance + i * 500,
        };
      });

      setData(newData);
    };

    generateData();
  }, [timeFilter]);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af" }}
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af" }}
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value: number) => [
              `$${value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
              "Value",
            ]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorValue)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
