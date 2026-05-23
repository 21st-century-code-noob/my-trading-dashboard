import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { usePriceStore } from "@/store/priceStore";
import PriceChangeText from "../price-change-text";

function setPrice(symbol: string, priceChange: number) {
  usePriceStore.setState({
    priceData: {
      [symbol]: {
        currentPrice: 100,
        priceChange,
        startPrice: 90,
        name: "Test",
      },
    },
    isLoading: false,
  });
}

function setLoading() {
  usePriceStore.setState({ priceData: {}, isLoading: true });
}

describe("PriceChangeText", () => {
  beforeEach(() => {
    usePriceStore.setState({ priceData: {}, isLoading: false });
  });

  it("renders positive change with text-up class", () => {
    setPrice("BTCUSD", 5.12);
    render(<PriceChangeText symbol="BTCUSD" />);
    const el = screen.getByText("+5.12%");
    expect(el.className).toContain("text-up");
    expect(el.className).not.toContain("text-down");
  });

  it("renders negative change with text-down class", () => {
    setPrice("BTCUSD", -3.45);
    render(<PriceChangeText symbol="BTCUSD" />);
    const el = screen.getByText("-3.45%");
    expect(el.className).toContain("text-down");
  });

  it("renders zero as 0.00% with text-neutral-400 class", () => {
    setPrice("BTCUSD", 0);
    render(<PriceChangeText symbol="BTCUSD" />);
    const el = screen.getByText("0.00%");
    expect(el.className).toContain("text-neutral-400");
    expect(el.className).not.toContain("text-down");
  });

  it("renders '--' when price data is missing", () => {
    render(<PriceChangeText symbol="UNKNOWN" />);
    expect(screen.getByText("--")).toBeDefined();
  });

  it("renders skeleton when loading", () => {
    setLoading();
    const { container } = render(<PriceChangeText symbol="BTCUSD" />);
    // skeleton renders a div with skeleton-pulse class
    expect(container.querySelector(".animate-skeleton-pulse")).toBeTruthy();
  });

  it("respects decimals prop", () => {
    setPrice("BTCUSD", 2.45678);
    render(<PriceChangeText symbol="BTCUSD" decimals={3} />);
    expect(screen.getByText("+2.457%")).toBeDefined();
  });
});