import { create } from "zustand";
import dummySymbols from "../data/dummy-symbols.json";

export type SymbolPair = {
  symbol: string;
  name: string;
};

export type TopList = {
  marketCap: SymbolPair[];
  gainer: SymbolPair[];
};

export type SymbolStore = {
  focusList: SymbolPair[];
  watchList: SymbolPair[];
  topList: TopList;
  /** Deduplicated union of all symbol lists */
  allSymbols: SymbolPair[];
  isLoading: boolean;
};

export const useSymbolStore = create<SymbolStore>(() => ({
  focusList: [],
  watchList: [],
  topList: { marketCap: [], gainer: [] },
  allSymbols: [],
  isLoading: true,
}));

function computeAllSymbols(): SymbolPair[] {
  const seen = new Set<string>();
  const result: SymbolPair[] = [];
  const allLists = [
    ...dummySymbols.focusList,
    ...dummySymbols.watchList,
    ...dummySymbols.topList.marketCap,
    ...dummySymbols.topList.gainer,
  ];
  for (const item of allLists) {
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
    topList: dummySymbols.topList,
    allSymbols: computeAllSymbols(),
    isLoading: false,
  });
}, 1000);