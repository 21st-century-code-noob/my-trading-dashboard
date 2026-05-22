import { useRef, useState, useEffect } from "react";

/**
 * Compares current numerical value against the last-seen value stored in a ref.
 * Returns an animation CSS class and a unique key to force rerender and restart
 * the CSS animation each time the value changes.
 */
export function useFlashOnChange(value: number | undefined): {
  flashClass: string;
  flashKey: number;
} {
  const prevRef = useRef<number | undefined>(value);
  const [flashClass, setFlashClass] = useState("");
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = value;

    if (
      prev === undefined ||
      value === undefined ||
      prev === value
    ) {
      setFlashClass("");
      return;
    }

    const cls = value > prev ? "animate-flash-up" : "animate-flash-down";
    setFlashClass(cls);
    setFlashKey((k) => k + 1);
  }, [value]);

  return { flashClass, flashKey };
}