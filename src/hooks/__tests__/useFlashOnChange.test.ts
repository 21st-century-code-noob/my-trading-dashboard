import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFlashOnChange } from "../useFlashOnChange";

describe("useFlashOnChange", () => {
  it("returns empty flashClass and key 0 on first render with initial value", () => {
    const { result } = renderHook(() => useFlashOnChange(100));
    expect(result.current.flashClass).toBe("");
    expect(result.current.flashKey).toBe(0);
  });

  it("returns empty flashClass when value stays the same", () => {
    const { result, rerender } = renderHook(
      ({ val }) => useFlashOnChange(val),
      { initialProps: { val: 100 } },
    );
    // first render already checked above
    rerender({ val: 100 });
    expect(result.current.flashClass).toBe("");
    expect(result.current.flashKey).toBe(0);
  });

  it("sets animate-flash-up and increments key when value increases", () => {
    const { result, rerender } = renderHook(
      ({ val }) => useFlashOnChange(val),
      { initialProps: { val: 100 } },
    );
    rerender({ val: 150 });
    expect(result.current.flashClass).toBe("animate-flash-up");
    expect(result.current.flashKey).toBe(1);
  });

  it("sets animate-flash-down and increments key when value decreases", () => {
    const { result, rerender } = renderHook(
      ({ val }) => useFlashOnChange(val),
      { initialProps: { val: 100 } },
    );
    rerender({ val: 50 });
    expect(result.current.flashClass).toBe("animate-flash-down");
    expect(result.current.flashKey).toBe(1);
  });

  it("leaves flashClass empty when value goes from number to undefined", () => {
    const { result, rerender } = renderHook(
      ({ val }) => useFlashOnChange(val as number | undefined),
      { initialProps: { val: 100 as number | undefined } },
    );
    rerender({ val: undefined });
    expect(result.current.flashClass).toBe("");
    expect(result.current.flashKey).toBe(0);
  });

  it("leaves flashClass empty when value goes from undefined to number", () => {
    const { result, rerender } = renderHook(
      ({ val }) => useFlashOnChange(val as number | undefined),
      { initialProps: { val: undefined as number | undefined } },
    );
    rerender({ val: 100 });
    expect(result.current.flashClass).toBe("");
    expect(result.current.flashKey).toBe(0);
  });

  it("increments key on each change", () => {
    const { result, rerender } = renderHook(
      ({ val }) => useFlashOnChange(val),
      { initialProps: { val: 100 } },
    );
    rerender({ val: 110 });
    expect(result.current.flashKey).toBe(1);
    rerender({ val: 90 });
    expect(result.current.flashKey).toBe(2);
    rerender({ val: 95 });
    expect(result.current.flashKey).toBe(3);
  });
});