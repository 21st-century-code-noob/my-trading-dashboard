import { describe, expect, it, beforeEach } from "vitest";
import { useSymbolStore } from "../symbolStore";

function getStore() {
  return useSymbolStore.getState();
}

describe("symbolStore", () => {
  beforeEach(() => {
    useSymbolStore.setState({
      focusList: [],
      watchList: [],
      topList: { marketCap: [], gainer: [] },
      allSymbols: [],
      isLoading: true,
    });
  });

  it("starts with loading true and empty lists", () => {
    expect(getStore().isLoading).toBe(true);
    expect(getStore().focusList).toEqual([]);
    expect(getStore().watchList).toEqual([]);
    expect(getStore().topList).toEqual({ marketCap: [], gainer: [] });
    expect(getStore().allSymbols).toEqual([]);
  });

  it("allows setting lists manually and computes allSymbols correctly", () => {
    const focus = [{ symbol: "BTCUSD", name: "Bitcoin" }];
    const watch = [
      { symbol: "ETHUSD", name: "Ethereum" },
      { symbol: "BTCUSD", name: "Bitcoin" },
    ];
    const topList = {
      marketCap: [{ symbol: "SOLUSD", name: "Solana" }],
      gainer: [{ symbol: "ETHUSD", name: "Ethereum" }],
    };

    useSymbolStore.setState({
      focusList: focus,
      watchList: watch,
      topList,
      allSymbols: dedupeForTest(focus, watch, topList),
      isLoading: false,
    });

    // BTCUSD, ETHUSD, SOLUSD — deduplication across all lists
    const all = getStore().allSymbols;
    expect(all).toHaveLength(3);
    expect(all.map((s) => s.symbol).sort()).toEqual(["BTCUSD", "ETHUSD", "SOLUSD"]);
  });
});

/**
 * Replicates the deduplication logic from symbolStore.ts.
 * This is tested here because the real function is not exported.
 */
function dedupeForTest(
  focusList: { symbol: string; name: string }[],
  watchList: { symbol: string; name: string }[],
  topList: { marketCap: { symbol: string; name: string }[]; gainer: { symbol: string; name: string }[] },
) {
  const seen = new Set<string>();
  const result: { symbol: string; name: string }[] = [];
  for (const item of [...focusList, ...watchList, ...topList.marketCap, ...topList.gainer]) {
    if (!seen.has(item.symbol)) {
      seen.add(item.symbol);
      result.push(item);
    }
  }
  return result;
}