import { CoinHistoryPoint } from "@/types";

export function formattedData<T extends CoinHistoryPoint>(array: readonly T[]) {
  const byMonth = new Map<string, number[]>();

  for (const point of array) {
    const d = new Date(point.time);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(Math.round(Number(point.priceUsd)));
  }

  const sorted = [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12);

  return sorted.map(([key, prices]) => ({
    price: Math.round(prices.reduce((s, p) => s + p, 0) / prices.length),
    date: new Date(key + "-01").toLocaleDateString("en", { month: "short" }),
  }));
}
