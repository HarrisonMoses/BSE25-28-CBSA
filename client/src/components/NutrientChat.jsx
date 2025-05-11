import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const NutrientsChart = ({farmdata }) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={farmdata}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="nitrogen" stroke="#FFD700" />
        <Line type="monotone" dataKey="phosphorous" stroke="#8b5cf6" />
        <Line type="monotone" dataKey="potassium" stroke="#32CD32" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NutrientsChart;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white ">{label}</p>
        <p className="text-sm text-amber-300">
          nitrogen:
          <span className="ml-2">{payload[0].value}</span>
          <span className="ml-1">mg/kg</span>
        </p>
        <p className="text-sm text-indigo-400">
          phosphorous:
          <span className="ml-2">{payload[1].value}</span>
          <span className="ml-1">mg/kg</span>
        </p>
        <p className="text-sm text-emerald-500">
          potassium:
          <span className="ml-2">{payload[2].value}</span>
          <span className="ml-1">mg/kg</span>
        </p>
      </div>
    );
  }
};
