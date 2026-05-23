import { create } from "zustand";
import dummySymbols from "../data/dummy-symbols.json";

export type SymbolPair = {
  symbol: string;
  name: string;
};

export type SymbolStore = {
  focusList: SymbolPair[];
  watchList: SymbolPair[];
  /** Deduplicated union of focus + watch lists */
  allSymbols: SymbolPair[];
  isLoading: boolean;
};

export const useSymbolStore = create<SymbolStore>(() => ({
  focusList: [],
  watchList: [],
  allSymbols: [],
  isLoading: true,
}));

function computeAllSymbols(): SymbolPair[] {
  const seen = new Set<string>();
  const result: SymbolPair[] = [];
  for (const item of [...dummySymbols.focusList, ...dummySymbols.watchList]) {
    if (!seen.has(item.symbol)) {
      seen.add(item.symbol);
      result.push(item);
    }
  }
  return result;
}

// Simulate 1-second loading delay
setTimeout(() => {
  useSymbolStore.setState({
    focusList: dummySymbols.focusList,
    watchList: dummySymbols.watchList,
    allSymbols: computeAllSymbols(),
    isLoading: false,
  });
}, 1000);
