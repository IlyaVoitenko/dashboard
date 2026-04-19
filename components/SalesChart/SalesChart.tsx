"use client";
import { useQuery } from "@tanstack/react-query";
import { getHistoryCoin } from "@/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formattedData } from "@/helper";
import styles from "./styles.module.scss";
import { useMemo } from "react";

const SalesChart = ({ coinName = "bitcoin" }) => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["coin-history", coinName],
    queryFn: () => getHistoryCoin(coinName),
  });
  const dataHistoryCoinFormatter = useMemo(
    () => formattedData(data?.data ?? []),
    [data?.data],
  );
  function uniq(arr) {
    const set = new Set();
    let result = [];
    for (const element of arr) {
      if (!set.has(element)) {
        result.push(element);
        set.add(element);
      }
    }
  }

  uniq(dataHistoryCoinFormatter);
  if (isPending) return <p>Loading…</p>;
  if (isError) return <p>{String(error)}</p>;

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart width={600} height={250} data={dataHistoryCoinFormatter}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1d6fb4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1d6fb4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: "red", fontSize: 11 }} />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fill: "#64748b", fontSize: 11 }}
          />
          <Tooltip
            formatter={(v) => [`$${Number(v).toLocaleString()}`, "BTC"]}
          />
          <Area
            dataKey="price"
            stroke="#38bdf8"
            fill="url(#grad)"
            strokeWidth={2}
            type="monotone"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
