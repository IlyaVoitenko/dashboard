import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", total: 500, returns: 200 },
  { month: "Feb", total: 210, returns: 195 },
  // ...
];

const SalesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area dataKey="total" fill="url(#gradTotal)" stroke="#38bdf8" />
        <Area dataKey="returns" fill="#1d4ed8" stroke="#1e88c8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
