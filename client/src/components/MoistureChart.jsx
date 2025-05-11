"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";



const MoistureChart = ({farmdata}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={farmdata}
        margin={{ right: 30 }}
      >
        <YAxis />
        <XAxis dataKey="timestamp" />
        <CartesianGrid strokeDasharray="5 5" />

        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Area
          type="monotone"
          dataKey="moisture"
          stroke="#2563eb"
          fill="#3b82f6"
          stackId="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white">{label}</p>
        <p className="text-sm text-blue-400">
          Moisture :<span className="ml-2">{payload[0].value}</span>
          <span className="ml-1">%</span>
        </p>
      </div>
    );
  }
};

export default MoistureChart;
