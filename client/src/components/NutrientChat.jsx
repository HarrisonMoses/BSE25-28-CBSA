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

const salesData = [
  {
    name: "Jan",
    nitrogen: 4000,
    phosphorous: 2400,
    potassium: 1800,
  },
  {
    name: "Feb",
    nitrogen: 3000,
    phosphorous: 1398,
    potassium: 2200,
  },
  {
    name: "Mar",
    nitrogen: 9800,
    phosphorous: 2000,
    potassium: 3500,
  },
  {
    name: "Apr",
    nitrogen: 3908,
    phosphorous: 2780,
    potassium: 1200,
  },
  {
    name: "May",
    nitrogen: 4800,
    phosphorous: 1890,
    potassium: 2800,
  },
  {
    name: "Jun",
    nitrogen: 3800,
    phosphorous: 2390,
    potassium: 1900,
  },
];

const NutrientsChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={salesData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
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
          <span className="ml-1">ppm</span>
        </p>
        <p className="text-sm text-indigo-400">
          phosphorous:
          <span className="ml-2">{payload[1].value}</span>
          <span className="ml-1">ppm</span>
        </p>
        <p className="text-sm text-emerald-500">
          potassium:
          <span className="ml-2">{payload[2].value}</span>
          <span className="ml-1">ppm</span>
        </p>
      </div>
    );
  }
};
