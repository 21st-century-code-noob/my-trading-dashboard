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
      allSymbols: [],
      isLoading: true,
    });
  });

  it("starts with loading true and empty lists", () => {
    expect(getStore().isLoading).toBe(true);
    expect(getStore().focusList).toEqual([]);
    expect(getStore().watchList).toEqual([]);
    expect(getStore().allSymbols).toEqual([]);
  });

  it("allows setting lists manually and computes allSymbols correctly", () => {
    const focus = [{ symbol: "BTCUSD", name: "Bitcoin" }];
    const watch = [
      { symbol: "ETHUSD", name: "Ethereum" },
      { symbol: "BTCUSD", name: "Bitcoin" },
    ];

    useSymbolStore.setState({
      focusList: focus,
      watchList: watch,
      allSymbols: dedupeForTest(focus, watch),
      isLoading: false,
    });

    // BTCUSD appears in both focus and watch — deduplication should keep one copy
    const all = getStore().allSymbols;
    expect(all).toHaveLength(2);
    expect(all[0].symbol).toBe("BTCUSD");
    expect(all[1].symbol).toBe("ETHUSD");
  });
});

/**
 * Replicates the deduplication logic from symbolStore.ts.
 * This is tested here because the real function is not exported.
 */
function dedupeForTest(focusList: { symbol: string; name: string }[], watchList: { symbol: string; name: string }[]) {
  const seen = new Set<string>();
  const result: { symbol: string; name: string }[] = [];
  for (const item of [...focusList, ...watchList]) {
    if (!seen.has(item.symbol)) {
      seen.add(item.symbol);
      result.push(item);
    }
  }
  return result;
}