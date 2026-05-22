import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { usePriceStore } from "@/store/priceStore";
import PriceText from "../price-text";

function setPrice(symbol: string, currentPrice: number) {
  usePriceStore.setState({
    priceData: {
      [symbol]: {
        currentPrice,
        priceChange: 0,
        startPrice: currentPrice,
        name: "Test",
      },
    },
    isLoading: false,
  });
}

function setLoading() {
  usePriceStore.setState({ priceData: {}, isLoading: true });
}

describe("PriceText", () => {
  beforeEach(() => {
    usePriceStore.setState({ priceData: {}, isLoading: false });
  });

  it("renders formatted price with dollar sign", () => {
    setPrice("BTCUSD", 50000.5);
    render(<PriceText symbol="BTCUSD" />);
    expect(screen.getByText("$50000.50")).toBeDefined();
  });

  it("renders '--' when price data is missing", () => {
    render(<PriceText symbol="UNKNOWN" />);
    expect(screen.getByText("$--")).toBeDefined();
  });

  it("renders skeleton when loading", () => {
    setLoading();
    const { container } = render(<PriceText symbol="BTCUSD" />);
    expect(container.querySelector(".skeleton-pulse")).toBeTruthy();
  });

  it("respects decimals prop", () => {
    setPrice("BTCUSD", 123.456);
    render(<PriceText symbol="BTCUSD" decimals={1} />);
    expect(screen.getByText("$123.5")).toBeDefined();
  });
});