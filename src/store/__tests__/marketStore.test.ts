import { describe, expect, it, beforeEach } from "vitest";
import { useMarketMetricsStore } from "../marketStore";

function getStore() {
  return useMarketMetricsStore.getState();
}

describe("marketMetricsStore", () => {
  beforeEach(() => {
    useMarketMetricsStore.setState({
      totalVolume: 0,
      marketCap: 0,
      avgGain: 0,
      btcDominance: 0,
      isLoading: true,
    });
  });

  it("starts with loading true and zeroed metrics", () => {
    expect(getStore().isLoading).toBe(true);
    expect(getStore().totalVolume).toBe(0);
    expect(getStore().marketCap).toBe(0);
    expect(getStore().avgGain).toBe(0);
    expect(getStore().btcDominance).toBe(0);
  });

  it("allows setting metrics and marking loaded", () => {
    useMarketMetricsStore.setState({
      totalVolume: 1_000_000_000,
      marketCap: 2_000_000_000,
      avgGain: 3.5,
      btcDominance: 55.2,
      isLoading: false,
    });

    const s = getStore();
    expect(s.isLoading).toBe(false);
    expect(s.totalVolume).toBe(1_000_000_000);
    expect(s.marketCap).toBe(2_000_000_000);
    expect(s.avgGain).toBe(3.5);
    expect(s.btcDominance).toBe(55.2);
  });

  it("getMetric returns the correct value for each key", () => {
    useMarketMetricsStore.setState({
      totalVolume: 500,
      marketCap: 1000,
      avgGain: 1.5,
      btcDominance: 60,
      isLoading: false,
    });

    const { getMetric } = getStore();
    expect(getMetric("totalVolume")).toBe(500);
    expect(getMetric("marketCap")).toBe(1000);
    expect(getMetric("avgGain")).toBe(1.5);
    expect(getMetric("btcDominance")).toBe(60);
  });
});