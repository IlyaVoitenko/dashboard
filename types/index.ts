export type CoinHistoryPoint = {
  priceUsd: string;
  time: number;
  date: string;
};

export type CoinHistoryResponse = {
  data: CoinHistoryPoint[];
};
