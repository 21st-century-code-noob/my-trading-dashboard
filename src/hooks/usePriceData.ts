import { useCallback } from "react";
import { usePriceStore, type PriceData } from "../store/priceStore";
import dummySymbols from "../data/dummy-symbols.json";

// ── static data ──────────────────────────────────────────────────────

/** Flatten and deduplicate focus + watch lists into a single symbol array */
function combineSymbols() {
  const seen = new Set<string>();
  const result: { symbol: string; name: string }[] = [];
  for (const item of [...dummySymbols.focusList, ...dummySymbols.watchList]) {
    if (!seen.has(item.symbol)) {
      seen.add(item.symbol);
      result.push(item);
    }
  }
  return result;
}

const ALL_SYMBOLS = combineSymbols();

// ── mock price helpers ───────────────────────────────────────────────

function generateBasePrice(symbol: string): number {
  if (/USD$|USDT$/.test(symbol)) {
    const hash = symbol
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);
    if (symbol.startsWith("BTC")) return 87000 + (hash % 5000);
    if (symbol.startsWith("ETH")) return 3200 + (hash % 400);
    if (symbol.startsWith("SOL")) return 120 + (hash % 60);
    if (symbol.startsWith("DOGE")) return 0.15 + (hash % 100) / 1000;
    return 10 + (hash % 500);
  }
  const hash = symbol.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  if (symbol === "AAPL") return 185 + (hash % 10);
  if (symbol === "TSLA") return 240 + (hash % 20);
  if (symbol === "MSFT") return 420 + (hash % 15);
  if (symbol === "AMZN") return 175 + (hash % 10);
  return 50 + (hash % 200);
}

const UPDATE_INTERVAL_MS = 2000;
const BATCH_SIZE = 3;

let tickerStarted = false;

function startTicker() {
  if (tickerStarted || ALL_SYMBOLS.length === 0) return;
  tickerStarted = true;

  const store = usePriceStore.getState;

  // seed initial prices with startPrice
  for (const { symbol } of ALL_SYMBOLS) {
    const base = generateBasePrice(symbol);
    store().setStartPrice(symbol, base);
  }

  // keep updating random symbols
  setInterval(() => {
    const shuffled = [...ALL_SYMBOLS].sort(() => Math.random() - 0.5);
    const batch = shuffled.slice(0, BATCH_SIZE);

    for (const { symbol } of batch) {
      const prev = store().getPriceBySymbol(symbol);
      // subtle random walk: ±0.1% relative to currentPrice
      const stepPercent = (Math.random() - 0.5) * 0.2;
      const base = prev?.currentPrice ?? generateBasePrice(symbol);
      const currentPrice = base * (1 + stepPercent / 100);
      const start = prev?.startPrice ?? base;
      const priceChange =
        start !== 0
          ? parseFloat((((currentPrice - start) / start) * 100).toFixed(2))
          : 0;

      store().updatePrice(symbol, { currentPrice, priceChange });
    }
  }, UPDATE_INTERVAL_MS);
}

// kick off the singleton ticker eagerly (no need to wait for a component)
startTicker();

// ── React hook (pure reader) ─────────────────────────────────────────

export function usePriceData() {
  const priceData = usePriceStore((s) => s.priceData);
  const getPriceBySymbol = usePriceStore((s) => s.getPriceBySymbol);

  const getPrice = useCallback(
    (symbol: string): PriceData | undefined => getPriceBySymbol(symbol),
    [getPriceBySymbol],
  );

  return {
    /** Combined deduplicated list from focus + watch lists */
    allSymbols: ALL_SYMBOLS,
    /** Focus list from the dummy data */
    focusList: dummySymbols.focusList,
    /** Watch list from the dummy data */
    watchList: dummySymbols.watchList,
    /** The full price map stored in Zustand */
    priceData,
    /** Get price data for a single symbol */
    getPriceBySymbol: getPrice,
  };
}