import { create } from "zustand";

export type MarketMetrics = {
  totalVolume: number;
  totalVolumeChange: number;
  marketCap: number;
  marketCapChange: number;
  avgGain: number;
  btcDominance: number;
  btcDominanceChange: number;
};

export type MetricKey = keyof MarketMetrics;

export type MarketMetricsStore = MarketMetrics & {
  isLoading: boolean;
  getMetric: (key: MetricKey) => number;
};

const DEFAULT_METRICS: MarketMetrics = {
  totalVolume: 1_234_567_890,
  totalVolumeChange: -3.2,
  marketCap: 2_890_000_000_000,
  marketCapChange: 1.8,
  avgGain: 2.35,
  btcDominance: 52.8,
  btcDominanceChange: -0.5,
};

export const useMarketMetricsStore = create<MarketMetricsStore>((set, get) => ({
  ...DEFAULT_METRICS,
  isLoading: true,
  getMetric: (key) => get()[key],
}));

// Simulate 1-second loading delay
setTimeout(() => {
  useMarketMetricsStore.setState({
    ...DEFAULT_METRICS,
    isLoading: false,
  });
}, 1000);