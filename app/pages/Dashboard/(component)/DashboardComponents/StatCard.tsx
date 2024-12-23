// StatCard.tsx
import React from 'react';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: 'up' | 'down';
  trendValue: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon: Icon,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
  onClick 
}) => {
  return (
    <div 
      className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
      role={onClick ? "button" : "presentation"}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Metrics */}
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
          <p 
            className={`${trend === 'up' ? 'text-green-500' : 'text-red-500'} 
              text-sm flex items-center mt-1`}
          >
            {trend === 'up' ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            {trendValue}
          </p>
        </div>

        {/* Right side - Icon */}
        <div className={`${iconBgColor} p-3 rounded-full`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;