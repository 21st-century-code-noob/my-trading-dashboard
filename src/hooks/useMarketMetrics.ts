import { useMarketMetricsStore, type MetricKey } from "@/store/marketStore";

export function useMarketMetrics() {
  const totalVolume = useMarketMetricsStore((s) => s.totalVolume);
  const marketCap = useMarketMetricsStore((s) => s.marketCap);
  const avgGain = useMarketMetricsStore((s) => s.avgGain);
  const btcDominance = useMarketMetricsStore((s) => s.btcDominance);
  const isLoading = useMarketMetricsStore((s) => s.isLoading);
  const getMetric = useMarketMetricsStore((s) => s.getMetric);

  return {
    totalVolume,
    marketCap,
    avgGain,
    btcDominance,
    isLoading,
    getMetric,
  };
}

export type { MetricKey };