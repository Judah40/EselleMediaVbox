// ViewerChart.tsx
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ViewerData {
  time: string;
  viewers: number;
}

interface ViewerChartProps {
  data: ViewerData[];
  title: string;
  className?: string;
}

const ViewerChart: React.FC<ViewerChartProps> = ({
  data,
  title,
  className = ''
}) => {
  const formatYAxis = (value: number | string): string => {
    if (typeof value === 'number') {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toString();
    }
    return value.toString();
  };
  

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className} w-full`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="viewerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-gray-200"
            />
            <XAxis
              dataKey="time"
              tick={{ fill: '#6b7280' }}
              tickLine={{ stroke: '#6b7280' }}
              axisLine={{ stroke: '#6b7280' }}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: '#6b7280' }}
              tickLine={{ stroke: '#6b7280' }}
              axisLine={{ stroke: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                padding: '0.5rem'
              }}
              labelStyle={{ color: '#374151', fontWeight: 600 }}
              formatter={(value: number) => [
                `${value.toLocaleString()} viewers`,
                'Viewers'
              ]}
            />
            <Area
              type="monotone"
              dataKey="viewers"
              stroke="#4f46e5"
              fill="url(#viewerGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViewerChart;