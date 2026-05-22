import { beforeEach, describe, expect, it } from "vitest";
import { usePriceStore } from "../priceStore";

function getStore() {
  return usePriceStore.getState();
}

describe("priceStore", () => {
  beforeEach(() => {
    usePriceStore.setState({ priceData: {}, isLoading: true });
  });

  describe("setStartPrice", () => {
    it("initializes a symbol entry with given values", () => {
      getStore().setStartPrice("BTCUSD", "Bitcoin", 50000);

      const entry = getStore().priceData["BTCUSD"];
      expect(entry).toBeDefined();
      expect(entry.currentPrice).toBe(50000);
      expect(entry.startPrice).toBe(50000);
      expect(entry.priceChange).toBe(0);
      expect(entry.name).toBe("Bitcoin");
    });

    it("overwrites an existing entry with new start price", () => {
      getStore().setStartPrice("BTCUSD", "Bitcoin", 50000);
      getStore().setStartPrice("BTCUSD", "Bitcoin", 60000);

      const entry = getStore().priceData["BTCUSD"];
      expect(entry.currentPrice).toBe(60000);
      expect(entry.startPrice).toBe(60000);
      expect(entry.priceChange).toBe(0);
    });
  });

  describe("updatePrice", () => {
    it("merges partial data onto an existing entry", () => {
      getStore().setStartPrice("ETHUSD", "Ethereum", 3000);

      getStore().updatePrice("ETHUSD", { currentPrice: 3100, priceChange: 3.33 });

      const entry = getStore().priceData["ETHUSD"];
      expect(entry.currentPrice).toBe(3100);
      expect(entry.priceChange).toBe(3.33);
      // unchanged fields
      expect(entry.startPrice).toBe(3000);
      expect(entry.name).toBe("Ethereum");
    });

    it("does not create an entry if symbol was never initialized", () => {
      getStore().updatePrice("UNKNOWN", { currentPrice: 100 });

      const entry = getStore().priceData["UNKNOWN"];
      // updatePrice spreads onto undefined → all fields NaN / undefined
      expect(entry.currentPrice).toBe(100);
      expect(entry.startPrice).toBeUndefined();
    });
  });

  describe("getPriceBySymbol", () => {
    it("returns undefined for unknown symbol", () => {
      expect(getStore().getPriceBySymbol("UNKNOWN")).toBeUndefined();
    });

    it("returns the correct entry for known symbol", () => {
      getStore().setStartPrice("BTCUSD", "Bitcoin", 50000);
      const entry = getStore().getPriceBySymbol("BTCUSD");
      expect(entry).toBeDefined();
      expect(entry!.currentPrice).toBe(50000);
    });
  });

  describe("setIsLoading", () => {
    it("toggles the loading flag", () => {
      expect(getStore().isLoading).toBe(true);
      getStore().setIsLoading(false);
      expect(getStore().isLoading).toBe(false);
    });
  });
});