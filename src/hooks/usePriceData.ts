import { useCallback } from "react";
import { usePriceStore, type PriceData } from "../store/priceStore";
import { useSymbolStore } from "../store/symbolStore";

// ── mock price helpers ───────────────────────────────────────────────

function generateBasePrice(symbol: string): number {
  const hash = symbol
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  if (symbol.startsWith("BTC")) return 87000 + (hash % 5000);
  if (symbol.startsWith("ETH")) return 3200 + (hash % 400);
  if (symbol.startsWith("SOL")) return 120 + (hash % 60);
  if (symbol.startsWith("DOGE")) return 0.15 + (hash % 100) / 1000;
  if (symbol.startsWith("LTC")) return 70 + (hash % 30);
  if (symbol.startsWith("XRP")) return 0.5 + (hash % 100) / 200;
  if (symbol.startsWith("ADA")) return 0.3 + (hash % 100) / 500;
  if (symbol.startsWith("DOT")) return 5 + (hash % 10);

  // forex pairs — base price mimics realistic exchange rates
  if (symbol.startsWith("EUR")) return 1.08 + (hash % 100) / 500;
  if (symbol.startsWith("GBP")) return 1.27 + (hash % 100) / 500;
  if (symbol.startsWith("USD")) return 0.65 + (hash % 100) / 200;
  if (symbol.startsWith("AUD")) return 0.67 + (hash % 100) / 500;
  if (symbol.startsWith("NZD")) return 0.61 + (hash % 100) / 500;

  return 1 + (hash % 500) / 100;
}

const UPDATE_INTERVAL_MS = 2000;
const BATCH_SIZE = 3;

let tickerStarted = false;

function startTicker() {
  if (tickerStarted) return;

  // Wait until symbols are loaded before starting prices
  const symbolStore = useSymbolStore.getState();
  if (symbolStore.isLoading) return;

  tickerStarted = true;

  const allSymbols = symbolStore.allSymbols;
  if (allSymbols.length === 0) return;

  const priceStore = usePriceStore.getState;

  // seed initial prices with startPrice ± at least 0.01 absolute delta
  for (const { symbol, name } of allSymbols) {
    const base = generateBasePrice(symbol);
    priceStore().setStartPrice(symbol, name, base);
    // ensure absolute price moves at least 0.01
    const sign = Math.random() < 0.5 ? -1 : 1;
    const delta = 0.01 + Math.random() * (base * 0.015); // 0.01 to 1.5% of base
    const currentPrice = parseFloat((base + sign * delta).toFixed(8));
    const priceChange = parseFloat(
      (((currentPrice - base) / base) * 100).toFixed(2),
    );
    priceStore().updatePrice(symbol, { currentPrice, priceChange });
  }

  // Simulate 1-second price loading delay, then mark as loaded
  setTimeout(() => {
    priceStore().setIsLoading(false);
  }, 1000);

  // keep updating random symbols
  setInterval(() => {
    const shuffled = [...allSymbols].sort(() => Math.random() - 0.5);
    const batch = shuffled.slice(0, BATCH_SIZE);

    for (const { symbol } of batch) {
      const prev = priceStore().getPriceBySymbol(symbol);
      const base = prev?.currentPrice ?? generateBasePrice(symbol);
      // ensure absolute price moves at least 0.01 each tick
      const sign = Math.random() < 0.5 ? -1 : 1;
      const delta = 0.01 + Math.random() * (Math.abs(base) * 0.002); // 0.01 to 0.2% of base
      const currentPrice = parseFloat((base + sign * delta).toFixed(8));
      const start = prev?.startPrice ?? base;
      const priceChange =
        start !== 0
          ? parseFloat((((currentPrice - start) / start) * 100).toFixed(2))
          : 0;
      priceStore().updatePrice(symbol, { currentPrice, priceChange });
    }
  }, UPDATE_INTERVAL_MS);
}

// Poll until symbols are loaded, then kick off the price ticker
const SYMBOL_POLL_INTERVAL = 50;
const symbolPollTimer = setInterval(() => {
  const symbolStore = useSymbolStore.getState();
  if (!symbolStore.isLoading) {
    clearInterval(symbolPollTimer);
    startTicker();
  }
}, SYMBOL_POLL_INTERVAL);

// ── React hook (pure reader) ─────────────────────────────────────────

export function usePriceData() {
  const priceData = usePriceStore((s) => s.priceData);
  const getPriceBySymbol = usePriceStore((s) => s.getPriceBySymbol);
  const getPriceDataSnapshot = useCallback(() => {
    return usePriceStore.getState();
  }, []);
  const isLoading = usePriceStore((s) => s.isLoading);
  const getPrice = useCallback(
    (symbol: string): PriceData | undefined => getPriceBySymbol(symbol),
    [getPriceBySymbol],
  );

  return {
    /** The full price map stored in Zustand */
    priceData,
    /** Get price data for a single symbol */
    getPriceBySymbol: getPrice,
    /** The price data snapshot when calling this function */
    getPriceDataSnapshot,
    /** Whether prices are still loading (initial seed + 1s delay) */
    isLoading,
  };
}