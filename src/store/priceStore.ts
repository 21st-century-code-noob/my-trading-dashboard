import { create } from "zustand";

export interface PriceData {
  currentPrice: number;
  /** Cumulative percentage change from startPrice: ((currentPrice - startPrice) / startPrice) * 100 */
  priceChange: number;
  /** The initial price when the ticker started — does not change after init */
  startPrice: number;
  name: string;
}

interface PriceStore {
  priceData: Record<string, PriceData>;
  updatePrice: (symbol: string, data: Partial<PriceData>) => void;
  setStartPrice: (symbol: string, name: string, startPrice: number) => void;
  getPriceBySymbol: (symbol: string) => PriceData | undefined;
}

export const usePriceStore = create<PriceStore>((set, get) => ({
  priceData: {},

  updatePrice: (symbol, data) =>
    set((state) => ({
      priceData: {
        ...state.priceData,
        [symbol]: {
          ...state.priceData[symbol],
          ...data,
        },
      },
    })),

  setStartPrice: (symbol, name, startPrice) =>
    set((state) => ({
      priceData: {
        ...state.priceData,
        [symbol]: {
          currentPrice: startPrice,
          priceChange: 0,
          startPrice,
          name,
        },
      },
    })),

  getPriceBySymbol: (symbol) => get().priceData[symbol],
}));