import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp } from "@/lib/icons";

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface SimpleBarChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
  showValues?: boolean;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  height = 200,
  className,
  showValues = true,
}) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className={cn("w-full", className)}>
      <div
        className="flex items-end justify-between gap-2 px-4 py-2"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 60);
          return (
            <div
              key={item.label + index}
              className="flex flex-col items-center flex-1"
            >
              <div
                className="text-xs font-medium mb-1"
                style={{ color: "var(--sneako-dark)" }}
              >
                {showValues && item.value}
              </div>
              <div
                className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${barHeight}px`,
                  background: item.color || "var(--sneako-gold)",
                  minHeight: "4px",
                }}
              />
              <div className="text-xs text-center mt-2 text-gray-600">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface SimpleLineChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
  strokeColor?: string;
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  height = 200,
  className,
  strokeColor = "var(--sneako-gold)",
}) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));
  const range = maxValue - minValue || 1;

  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value - minValue) / range) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={cn("w-full", className)}>
      <div style={{ height: `${height}px` }} className="relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute inset-0"
        >
          <polyline
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            points={points}
            className="drop-shadow-sm"
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item.value - minValue) / range) * 80;
            return (
              <circle
                key={item.label + index}
                cx={x}
                cy={y}
                r="2"
                fill={strokeColor}
                className="drop-shadow-sm"
              />
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div
            key={item.label + index}
            className="text-xs text-center text-gray-600"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  className,
}) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={cn("p-6 rounded-lg shadow-sm border", className)}
      style={{
        background: "var(--sneako-beige)",
        borderColor: "var(--sneako-gold)",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-sm font-medium mb-1"
            style={{ color: "var(--sneako-dark)" }}
          >
            {title}
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--sneako-dark)" }}
          >
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {isPositive && (
                <TrendingUp
                  width={16}
                  height={16}
                  className="text-green-600 mr-1"
                />
              )}
              {isNegative && (
                <TrendingUp
                  width={16}
                  height={16}
                  className="text-red-600 mr-1 rotate-180"
                />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive && "text-green-600",
                  isNegative && "text-red-600",
                  change === 0 && "text-gray-500"
                )}
              >
                {change > 0 && "+"}
                {change}%
              </span>
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-full"
          style={{ background: "var(--sneako-gold)" }}
        >
          <Icon
            width={24}
            height={24}
            style={{ color: "var(--sneako-dark)" }}
          />
        </div>
      </div>
    </div>
  );
};
