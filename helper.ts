/** Minimum shape the formatter needs; your API row can extend this. */
import { CoinHistoryPoint } from "@/types";

export function formattedData<T extends CoinHistoryPoint>(array: readonly T[]) {
  return array.slice(-365).map((point) => ({
    price: Math.round(Number(point.priceUsd)),
    date: new Date(point.time).toLocaleDateString("en", {
      day: "numeric",
      month: "short",
    }),
  }));
}
