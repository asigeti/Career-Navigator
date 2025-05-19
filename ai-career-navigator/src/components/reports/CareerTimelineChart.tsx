// src/components/reports/CareerTimelineChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type TimelinePoint = {
  year: string;
  withStrategy: number;
  withoutStrategy: number;
};

type CareerTimelineChartProps = {
  data: TimelinePoint[];
  colors?: {
    withStrategy: string;
    withoutStrategy: string;
  };
};

const CareerTimelineChart: React.FC<CareerTimelineChartProps> = ({
  data,
  colors = { withStrategy: '#4c51bf', withoutStrategy: '#f56565' }
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="withStrategy"
          name="With Career Strategy"
          stroke={colors.withStrategy}
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="withoutStrategy"
          name="Without Strategy"
          stroke={colors.withoutStrategy}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CareerTimelineChart;