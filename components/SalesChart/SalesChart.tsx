"use client";
import { useQuery } from "@tanstack/react-query";
import { getHistoryCoin } from "@/lib/api";
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
  let coinNameUpperCase = coinName;
  if (coinName !== "")
    coinNameUpperCase =
      coinNameUpperCase[0].toUpperCase() + coinNameUpperCase.slice(1);
  if (isPending) return <p>Loading…</p>;
  if (isError) return <p>{String(error)}</p>;

  return (
    <div className={styles.container}>
      <h2>Sales of {coinNameUpperCase || "none"}</h2>
      <ResponsiveContainer width="100%" height={250} style={{ margin: 0 }}>
        <AreaChart
          width={600}
          height={250}
          data={dataHistoryCoinFormatter}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="15%" stopColor="#115880" stopOpacity={0.8} />
              <stop offset="85%" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: "#e5e5e5c3", fontSize: 11 }} />
          <YAxis
            width={45}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fill: "#e5e5e5c3", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(0, 16, 52, 0.622)",
              border: "none",
            }}
            formatter={(v) => [`$${Number(v).toLocaleString()}`, "BTC"]}
          />
          <Area
            dataKey="price"
            stroke="#2AD1F7"
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
