import { create } from "zustand";
import dummySymbols from "../data/dummy-symbols.json";

export interface SymbolPair {
  symbol: string;
  name: string;
}

interface SymbolStore {
  focusList: SymbolPair[];
  watchList: SymbolPair[];
  /** Deduplicated union of focus + watch lists */
  allSymbols: SymbolPair[];
}

export const useSymbolStore = create<SymbolStore>(() => ({
  focusList: dummySymbols.focusList,
  watchList: dummySymbols.watchList,
  allSymbols: computeAllSymbols(),
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